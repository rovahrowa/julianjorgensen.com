let express = require('express');
let router = express.Router();
let axios = require('axios');
let app = require('../app');
let util = require('../util/util');
let merge = require('merge'), original, cloned;

// Invoice route for Quickbooks
router.route('/invoice/:id')
  .get(function (req, res) {
    console.log('getting data from Quickbooks...');
    qbo.getInvoice(req.params.id, function(error, invoice) {
      if(invoice) {
        // generate unique md5 token
        let secretVariable = 'Invoice' + invoice.Id;
        let token = util.createToken(secretVariable);

        // if the url token parameter is the correct key, then show the invoice
        if(req.query.token === token) {
          // get customer data too
          console.log('getting customer data based on invoice...');
          let customerId = invoice.CustomerRef.value;
          qbo.getCustomer(customerId, function(error, customer) {
            if(customer){
              console.log('we found this customer: ', customer);

              let invoiceAndCustomer = merge(invoice, customer);
              res.json(invoiceAndCustomer).end();
            }else{
              console.log('there was an error getting quickbooks customer: ', error);
              res.json(error).end();
            }
          });
        }else{
          res.status(401).send('You are unauthorized to see this invoice.');
        }
      }else{
        res.json(error);
      }
    });
  });

module.exports = router;
