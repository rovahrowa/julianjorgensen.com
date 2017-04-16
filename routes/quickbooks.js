let express = require('express');
let router = express.Router();
var app = require('../server');

let crypto = require('crypto');

// Invoice route for Quickbooks
router.route('/invoice/:id')
  .get(function (req, res) {
    console.log('getting data from Quickbooks...');
    qbo.getInvoice(req.params.id, function(e, invoice) {
      if(invoice){
        // generate unique md5 token
        let secretVariable = invoice.MetaData.LastUpdatedTime.substring(0, 10);
        let key = crypto.createHash('md5').update(secretVariable).digest('hex');

        console.log('secret variable:');
        console.log(secretVariable);
        console.log(key);

        // if the url token parameter is the correct key, then show the invoice
        if(req.query.token === key){
          res.json(invoice);
        }else{
          res.status(401).send('You are unauthorized to see this invoice.');
        }
      }else{
        res.json(e);
      }
    });
  });


// Customer route for Quickbooks
router.route('/customer/:id')
  .get(function (req, res) {
    qbo.getCustomer(req.params.id, function(e, customer) {
      if(customer){
        res.json(customer);
      }else{
        res.json(e);
      }
    });
  });

module.exports = router;
