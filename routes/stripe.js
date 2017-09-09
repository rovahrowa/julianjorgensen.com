let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let moment = require('moment');
let app = require('../app');

// let publicVars = require('.././config/' + (process.env.NODE_ENV || 'development') + '.config');
// const keyPublishable = publicVars.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;
let stripe = require('stripe')(keySecret);

router.route('/find-customer')
  .get(function (req, res) {
    // search for existing customer(s) with matching email
    return new Promise((resolve, reject) => {
      stripe.customers.list({ limit: 100 }, (err, customers) => {

        let existingCustomer = [];

        // loop through customers
        customers.data.map((customer, i) => {
          if (customer.email === email) {
            existingCustomer.push(customer);
          }
        });

        resolve(existingCustomer);
      })
      .catch((error) => {
        reject(error);
      });
    });
  });


router.route('/charge-customer')
  .post(function (req, res) {
    findCustomer.then((existingCustomer) => {
      console.log('existing customer: ', existingCustomer);
      if (existingCustomer.length > 0) {
        chargeCustomer(existingCustomer[0].id);
      }
    });
  });

router.route('/create-customer')
  .post(function(req, res) {
    // Create a new customer
    stripe.customers.create({
      email,
      source: stripeToken,
    }).then((customer) => {
      chargeCustomer(customer.id);
    }).catch((error) => {
      throw error(error);
    });
  });

router.route('/charge')
  .post(function (req, res) {
    let { email, stripeToken, invoiceId, invoiceNumber, amount, currency } = req.body;

    console.log('body', req.body);

    // charge the customer with stripe
    stripe.charges.create({
      amount: amount*100, // times 100 to get it in dollars
      currency,
      description: 'Flo Digital Inc. (Julian Jorgensen) invoice #' + invoiceNumber,
      source: stripeToken
    }, (error, charge) => {
      if(!error) {
        console.log('charged!, ', charge);

        console.log('getting invoice', invoiceId);
        qbo.getInvoice(invoiceId, (e, invoice) => {
          console.log('got invoice from qbo', invoice);
          qbo.updateInvoice({
            "Id": invoiceId,
            "SyncToken": invoice.SyncToken,
            "CustomField": [{
              "DefinitionId": "1",
              "Name": "paid date",
              "Type": "StringType",
              "StringValue": moment(Date.now()).format("DD-MM-YYYY")
            }]
          }, (e, updatedInvoice) => {
            console.log('Invoice updated');
            res.sendStatus(200);
          });
        });
      }else{
        console.log('error', error);
        res.status(200).send({ error: error.message });
      }
    });
  });


module.exports = router;
