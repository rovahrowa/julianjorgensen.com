let express = require('express');
let router = express.Router();
let app = require('../app');

let util = require('../utils/utils');
let ENV_CONFIG = util.getEnvConfig();

let {
  mailItem
} = require('../utils/qbo');

let invoiceReminder = require('../crons/invoiceReminder/init');

router.route('/')
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
        let itemType = event.name.toLowerCase();
        console.log('itemType: ', itemType);

        // get event type (Create, Update, or Delete)
        let eventType = event.operation.toLowerCase();
        console.log('eventType: ', eventType);

        let itemId = event.id;

        // If its an invoice
        if (itemType === 'invoice') {
          qbo.getInvoice(itemId, (err, invoice) => {
            mailItem({
              item: invoice,
              itemType,
              eventType
            }).then((response) => {
              console.log('invoice sent', invoice);
              res.status(200).send(response);
            }).catch((error) => {
              res.status(500).send(error);
            });
          });
        }

        // If its an estimate
        if (itemType === 'estimate') {
          qbo.getEstimate(itemId, (err, estimate) => {
            mailItem({
              item: estimate,
              itemType,
              eventType
            }).then((response) => {
              console.log('estimate sent', estimate);
              res.status(200).send(response);
            }).catch((error) => {
              res.status(500).send(error);
            });
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
