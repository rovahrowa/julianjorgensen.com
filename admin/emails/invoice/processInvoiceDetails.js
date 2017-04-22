let util = require('../../../util/util');
let numeral = require('numeral');
let dateFormat = require('dateformat');

let processInvoiceDetails = function(passedData) {
  console.log('processing invoice...');

  let promise = new Promise(function(resolve, reject){

    let customer = passedData[0];
    let invoice = passedData[1];

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
          name: __dirname + '/invoice.pug',
          engine: 'pug',
          context: contextObject
        }
      };
      // if CC exists, then also include that the object
      if (emailCc){
        Object.assign({cc: emailCc}, mailOptions);
      }

      resolve(mailOptions);
    }else{
      reject(forbidden);
    }

  });
  return promise;
};

module.exports = processInvoiceDetails;
