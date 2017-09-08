let express = require('express');
let router = express.Router();
let app = require('../app');
let util = require('../util/util');

let invoice = require('../admin/emails/invoice/init');
let invoiceReminder = require('../admin/crons/invoiceReminder/init');
let togglSync = require('../admin/toggl/init');
let sendEstimateConfirmation = require('../admin/emails/estimateRequest/init');

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
      return res.status(200).send('there was no payload sending invoice email');
    }

    // validate signature
    if (util.isValidPayload(signature, token, payload)) {
      invoice.send(invoiceRef.id, 'new').then(() => {
        res.status(200).send(`Invoice #${invoiceRef.id} sent!`);
      }).catch((err) => {
        res.status(500).send(`Error sending invoice #${invoiceRef.id}...`);
      });
    }else{
      return res.status(401).send('Forbidden');
    }
  });

// Send the get estimate email to prospect client
router.route('/get-estimate')
  .post(function (req, res) {
    sendEstimateConfirmation.send(req.body).then(() => {
      res.status(200).send('success');
    });
  });


router.route('/test')
  .post(function (req, res) {
    invoiceReminder.init().then(() => {
      res.status(200).send('success');
    }).catch((err) => {
      res.status(401).send(`${err}`);
    });
  });

router.route('/test-toggl')
  .post(function (req, res) {
    togglSync.init().then(() => {
      res.status(200).send('success');
    }).catch((err) => {
      res.status(401).send(`${err}`);
    });
  });


module.exports = router;
