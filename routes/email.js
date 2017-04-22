let express = require('express');
let router = express.Router();
let app = require('../app');
let util = require('../util/util');
let invoice = require('../admin/emails/invoice/invoice');
let sendInvoiceReminder = require('../admin/emails/sendInvoiceReminder');
let sendEstimateConfirmation = require('../admin/emails/sendEstimateConfirmation');


// Send the invoice
router.route('/invoice')
  .post(function (req, res) {
    // get data from QBO webhook
    let payload = req.body;
    let invoiceRef = payload.eventNotifications[0].dataChangeEvent.entities[0];
    let signature = req.get('intuit-signature');
    let token = process.env.QBO_WEBHOOK_TOKEN;

    // if signature is empty return 401
    if (!signature) {
      return res.status(401).send('FORBIDDEN');
    }

    // if payload is empty, don't do anything
    if (!payload) {
      return res.status(200).send('success');
    }

    // validate signature
    if (util.isValidPayload(signature, token, payload)) {
      invoice.send(invoiceRef.id);
    }else{
      return res.status(401).send('Forbidden');
    }
  });

// Send the get estimate email to prospect client
router.route('/get-estimate')
  .post(function (req, res) {
    sendEstimateConfirmation();
  });


router.route('/test')
  .post(function (req, res) {
    let payload = {"eventNotifications":[{"realmId":"193514525151214","dataChangeEvent":{"entities":[{"name":"Invoice","id":"132","operation":"Update","lastUpdated":"2017-04-16T06:18:04.000Z"}]}}]}
    let invoiceRef = payload.eventNotifications[0].dataChangeEvent.entities[0];

    invoice.send(invoiceRef.id).then(() => {
      res.status(200).send(`Invoice #${invoiceRef.id} sent!`);
    }).catch((err) => {
      res.status(500).send(`Error sending invoice #${invoiceRef.id}...`);
    });
  });

module.exports = router;
