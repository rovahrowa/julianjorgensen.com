let express = require('express');
let router = express.Router();
let axios = require('axios');
let app = require('../app');
let _ = require('lodash');

let util = require('../util/util');
let ENV_CONFIG = util.getEnvConfig();

let invoiceMailer = require('../admin/emails/invoice/init');
let invoiceReminder = require('../admin/crons/invoiceReminder/init');

// Invoice route for Quickbooks
router.route('/invoice/:id')
  .get(function (req, res) {
    qbo.getInvoice(req.params.id, (error, invoiceRef) => {
      if (!invoiceRef) {
        res.status(200).json(error);
      }

      // generate unique md5 token
      let secretVariable = 'Invoice' + invoiceRef.Id;
      let token = util.createToken(secretVariable);

      if (req.query.token !== token) {
        res.status(401).send('You are unauthorized to see this invoice.');
      }

      // if the url token parameter is the correct key, then show the invoice
      // get customer data too
      console.log('getting customer data based on invoice...');
      let customerId = invoiceRef.CustomerRef.value;
      qbo.getCustomer(customerId, function (error, customer) {
        if (customer) {
          console.log('we found this customer: ', customer);
          let invoiceAndCustomer = {
            invoice: invoiceRef,
            customer: customer
          };
          res.json(invoiceAndCustomer).end();
        } else {
          console.log('there was an error getting quickbooks customer: ', error);
          res.json(error).end();
        }
      });
    });
  });


router.route('/webhook')
  .post(function (req, res) {
    // get data from QBO webhook
    let payload = req.body;
    let signature = req.get('intuit-signature');
    let token = process.env.QBO_WEBHOOK_TOKEN;

    console.log('payload from QBO', JSON.stringify(payload));

    // validate signature
    if (!util.isValidPayload(signature, token, payload)) {
      res.status(500).send('There was an error validating invoice token or payload.');
    }

    // loop over all events emitted by QBO webhook
    payload.eventNotifications.map((event) => {
      // get event name (Invoice, or Estimate)
      let eventName = event.dataChangeEvent.entities[0].name.toLowerCase();
      console.log('eventName: ', eventName);

      // get event type (Create, Update, or Delete)
      let eventType = event.dataChangeEvent.entities[0].operation.toLowerCase();
      console.log('eventType: ', eventType);

      let eventId = event.dataChangeEvent.entities[0].id;


      // If its an invoice
      if (eventName === 'invoice') {
        // get invoice details
        qbo.getInvoice(eventId, (err, invoice) => {
          console.log('got invoice details from webhook: ', invoice);

          // get last sent date
          let lastSentDateObj = _.find(invoice.CustomField, {
            'Name': ENV_CONFIG.QBO_SENT_LABEL
          });
          let lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

          console.log('last sent date', lastSentDate);
          console.log('send invoice?', !lastSentDate);

          if (!lastSentDate) {
            // send the invoice
            invoiceMailer.send(invoice.Id, eventType).then(() => {
              res.status(200).send(`Invoice #${invoiceRef.id} sent!`);
            }).catch((err) => {
              res.status(500).send(`Error sending invoice #${invoiceRef.id}...`);
            });
          }
        });
      }

      // If its an estimate
      if (eventName === 'estimate') {}
    });
  });

router.route('/trigger/invoiceReminders')
  .get(function (req, res) {
    invoiceReminder.init()
      .then(() => {
        res.status(200).send('finished sending invoice reminders...');
      })
      .catch((err) => {
        res.status(500).send('invoice reminder error: ', err);
      });
  });

module.exports = router;
