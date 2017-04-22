let express = require('express');
let router = express.Router();
let app = require('../app');
let crypto = require('crypto');
let bodyParser = require('body-parser');
let util = require('../util/util');
let numeral = require('numeral');
let dateFormat = require('dateformat');

let nodemailer = require('nodemailer');
let mg = require('nodemailer-mailgun-transport');
let pug = require('pug');

function addHttp(url){
  if (!url.match(/^[a-zA-Z]+:\/\//)){
    url = 'http://' + url;
  }
  return url;
}

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
let auth = {
  auth: {
    api_key: 'key-06c8cc25bbde08805918b4e42dcad22f',
    domain: 'mailer.julianjorgensen.com'
  }
}

let nodemailerMailgun = nodemailer.createTransport(mg(auth));


// Invoice reminder email
// let subject = 'Your project';
// let contextObject = {
//   schemaAction: 'AskAction', //http://schema.org/
//   emailSummary: 'Project discovery',
//   alertText: 'Invoice is overdue',
//   name: 'Julian',
//   text: 'I\'m super excited to hear more about your project. In the meantime please fill out this questionaire about your project. This will result in a more thorough quote.',
//   ctaColor: 'warning',
//   ctaText: 'Enter project details',
//   ctaLink: 'https://goo.gl/forms/i8TwGVYpMkrrk5hj2',
//   ctaDisclaimer: '(Takes about 5-10 minutes)'
// };


// Send the invoice
// ===================
router.route('/invoice')
  .post(function (req, res) {
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

      // Get details about the invoice and customer
      let getInvoiceDetails = new Promise((resolve, reject) => {
        qbo.getInvoice(invoiceRef.id, (error, invoice) => {
          if (invoice){
            let customerId = invoice.CustomerRef.value;
            qbo.getCustomer(customerId, (error, customer) => {
              if(customer){
                customer = customer;
                invoice = invoice;
                resolve([customer, invoice]);
              }else{
                reject('While sending the invoice email, there was an error getting quickbooks customer: ' + error);
              }
            });
          }else{
            reject('While sending the invoice email, there was an error getting quickbooks invoice: ' + error);
          }
        });
      });

      getInvoiceDetails.then((result) => {
        let customer = result[0];
        let invoice = result[1];

        // Create token for email button
        let invoiceId = invoice.Id;
        let secretVariable = 'Invoice' + invoice.Id;
        let invoiceToken = util.createToken(secretVariable);

        // Create variables
        let invoiceNumber = invoice.DocNumber;
        let invoiceAmount = numeral(invoice.TotalAmt).format('$0,0.00');
        let invoiceDueDate = dateFormat(invoice.DueDate, "mmmm dS, yyyy");
        let customerIsActive = customer.Active;
        let customerName = customer.GivenName;
        let companyName = customer.CompanyName;

        // if invoice has an email then use that, otherwise use the email(s) associated with the customer
        let email;
        let emailCc;
        if (invoice.BillEmail){
          email = invoice.BillEmail.Address;
        }else if (customer.PrimaryEmailAddr){
          email = customer.PrimaryEmailAddr.Address;
        }else{
          email = null;
        }
        if (invoice.BillEmailCc){
          emailCc = invoice.BillEmailCc.Address;
        }else{
          emailCc = null;
        }

        // if customer is active and has a email (or the invoice has an email specified)
        if (customerIsActive && email){
          let contextObject = {
            invoiceId,
            invoiceNumber,
            invoiceAmount,
            invoiceDueDate,
            invoiceToken,
            customerName,
            companyName
          };

          let mailOptions = {
            from: {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
            to: [{name:customerName, address:email}], // An array if you have multiple recipients.
            subject: 'Invoice #' + invoiceNumber,
            template: {
              name: '../admin/emails/invoice.pug',
              engine: 'pug',
              context: contextObject
            }
          };
          // if CC exists, then also include that the object
          if (emailCc){
            Object.assign({cc: emailCc}, mailOptions);
          }

          // Finally send the mail!
          sendMail(mailOptions);
          return res.status(200).send('success');
      	}else{
          return res.status(401).send('FORBIDDEN');
        }
      }).catch((error) => {
        console.log('Error getting invoice and customer details...', error);
      });
    }
  });


router.route('/test')
  .get(function (req, res) {
    let payload = {"eventNotifications":[{"realmId":"193514525151214","dataChangeEvent":{"entities":[{"name":"Invoice","id":"132","operation":"Update","lastUpdated":"2017-04-16T06:18:04.000Z"}]}}]}
    console.log(payload);
    res.send(payload.eventNotifications[0].dataChangeEvent.entities[0].lastUpdated);
  });

// Send the get estimate email to prospect client
// ===================
router.route('/get-estimate')
  .post(function (req, res) {
    let {name, email, projectName, projectWebsite, notes} = req.body;

    let contextObject = {
      schemaAction: 'AskAction', //http://schema.org/
      emailSummary: 'Project discovery',
      name: name.split(' ')[0],
      projectName: projectName,
      projectWebsite: addHttp(projectWebsite),
      notes: notes
    };

    // send the estimate confirmation to the prospect
    let estimateConfirmation = {
      from: {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
      to: [{name:name, address:email}], // An array if you have multiple recipients.
      subject: 'Your project',
      template: {
        name: '../admin/emails/estimate.pug',
        engine: 'pug',
        context: contextObject
      }
    };
    sendMail(estimateConfirmation);

    // send the estimate request to myself
    let estimateRequest = {
      from: {name: name, address: email},
      to: [{name:'Julian Jorgensen', address:'me@julianjorgensen.com'}], // An array if you have multiple recipients.
      subject: projectName + ' estimate',
      template: {
        name: '../admin/emails/estimateRequest.pug',
        engine: 'pug',
        context: contextObject
      }
    };
    sendMail(estimateRequest);
    res.status(200).send('success');
  });

function sendMail(mailOptions){
  nodemailerMailgun.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log('Error: ' + err);
    }
    else {
      console.log('Response: ' + info);
    }
  });
}

module.exports = router;
