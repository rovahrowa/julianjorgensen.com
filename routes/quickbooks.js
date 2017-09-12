let express = require('express');
let router = express.Router();
let axios = require('axios');
let app = require('../app');
let _ = require('lodash');

let util = require('../util/util');
let ENV_CONFIG = util.getEnvConfig();

let estimateMailer = require('../admin/emails/estimate/init');
let invoiceMailer = require('../admin/emails/invoice/init');
let invoiceReminder = require('../admin/crons/invoiceReminder/init');

// Get Invoice/Estimate route for Quickbooks
router.route('/:type/:id')
  .get(function(req, res) {
    // generate unique md5 token
    let secretVariable = 'Item' + req.params.id;
    let token = util.createToken(secretVariable);

    // if token is false, then don't allow
    if (req.query.token !== token) {
      res.status(401).send('You are unauthorized to see this item.').end();
    }

    if (req.params.type === 'invoice') {
      // get invoice
      qbo.getInvoice(req.params.id, (error, item) => {
        processItemData(item).then(() => {
            res.status(200).json(response).end();
          })
          .catch((err) => {
            res.status(500).send(err).end();
          });
      });
    }

    if (req.params.type === 'estimate') {
      // get estimate
      qbo.getEstimate(req.params.id, (error, item) => {
        processItemData(item).then(() => {
            res.status(200).json(response).end();
          })
          .catch((err) => {
            res.status(500).send(err).end();
          });
      });
    }
  });


router.route('/webhook')
  .post(function(req, res) {
    // get data from QBO webhook
    let payload = req.body;
    let signature = req.get('intuit-signature');
    let token = process.env.QBO_WEBHOOK_TOKEN;

    console.log('payload from QBO', JSON.stringify(payload));

    // validate signature
    if (!util.isValidPayload(signature, token, payload)) {
      res.status(500).send('There was an error validating invoice token or payload.');
    }

    // loop over all event notifications emitted by QBO webhook
    payload.eventNotifications.map((events) => {

      // loop over all events
      events.dataChangeEvent.entities.map((event) => {
        // get event name (Invoice, or Estimate)
        let eventName = event.name.toLowerCase();
        console.log('eventName: ', eventName);

        // get event type (Create, Update, or Delete)
        let eventType = event.operation.toLowerCase();
        console.log('eventType: ', eventType);

        let eventId = event.id;

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
                res.status(200).send(`Invoice #${invoice.DocNumber} sent!`);
              }).catch((err) => {
                res.status(500).send(`Error sending invoice #${invoice.DocNumber}...`);
              });
            }
          });
        }

        // If its an estimate
        if (eventName === 'estimate') {
          // get estimate details
          qbo.getEstimate(eventId, (err, estimate) => {
            console.log('got estimate details from webhook: ', estimate);

            // get last sent date
            let lastSentDateObj = _.find(estimate.CustomField, {
              'Name': ENV_CONFIG.QBO_SENT_LABEL
            });
            let lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

            console.log('last sent date', lastSentDate);
            console.log('send estimate?', !lastSentDate);

            if (!lastSentDate) {
              // send the estimate
              estimateMailer.send(estimate.Id, eventType).then(() => {
                res.status(200).send(`Estimate #${estimate.DocNumber} sent!`);
              }).catch((err) => {
                res.status(500).send(`Error sending estimate #${estimate.DocNumber}...`);
              });
            }
          });
        }
      });
    });
  });

router.route('/trigger/invoiceReminders')
  .get(function(req, res) {
    invoiceReminder.init()
      .then(() => {
        res.status(200).send('finished sending invoice reminders...');
      })
      .catch((err) => {
        res.status(500).send('invoice reminder error: ', err);
      });
  });

module.exports = router;
