let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let moment = require('moment');
let app = require('../app');

// let publicVars = require('.././config/' + (process.env.NODE_ENV || 'development') + '.config');
// const keyPublishable = publicVars.STRIPE_PUBLISHABLE_KEY;
const keySecret = process.env.STRIPE_SECRET_KEY;
let stripe = require('stripe')(keySecret);

router.route('/')
  .post(function (req, res) {
    // Token is created using Stripe.js
    let {email, stripeToken, invoiceId, invoiceNumber, amount, currency} = req.body;

    console.log('body', req.body);

    // search for existing customer(s) with matching email
    let findCustomer = new Promise((resolve, reject) => {
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

    // if exists then charge that customer, otherwise create new
    findCustomer.then((existingCustomer) => {
      console.log('existing customer: ', existingCustomer);
      if (existingCustomer.length > 0) {
        chargeCustomer(existingCustomer[0].id);
      }else{
        // Create a new customer
        stripe.customers.create({
          email,
          source: stripeToken,
        }).then((customer) => {
          chargeCustomer(customer.id);
        }).catch((error) => {
          throw error(error);
        })
      }
    })
    .catch((error) => {
      throw error(error);
    });

    // charge the customer with stripe
    function chargeCustomer(customerId){
      console.log('charging customer: ', customerId);

      stripe.charges.create({
        amount: parseInt(amount)*100, // times 100 to get it in dollars
        currency,
        description: 'Flo Digital Inc. (Julian Jorgensen) invoice #' + invoiceNumber,
        customer: customerId,
      }).then((charge) => {
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
          }).then((updatedInvoice) => {
            console.log('Invoice updated');
            res.sendStatus(200);
          }).catch((error) => {
            console.log('error', error);
            throw error(error);
          });
        });
      })
      .catch((error) => {
        console.log('error', error);
        throw error(error);
      });
    }
  });


module.exports = router;
