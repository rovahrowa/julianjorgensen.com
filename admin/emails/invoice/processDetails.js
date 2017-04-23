let util = require('../../../util/util');
let numeral = require('numeral');
let dateFormat = require('dateformat');
let prepareContent = require('./prepareContent');
let adminAlertEmail = require('../adminAlertEmail');

let processInvoiceDetails = function(passedData) {
  console.log('processing invoice...');
  let promise = new Promise(function(resolve, reject){

    let customer = passedData[0];
    let invoice = passedData[1];
    let invoiceType = passedData[2];

    // Create token for email button
    let invoiceId = invoice.Id;
    let secretVariable = 'Invoice' + invoice.Id;
    let invoiceToken = util.createToken(secretVariable);

    // Create variables
    let invoiceNumber = invoice.DocNumber;
    let invoiceAmount = numeral(invoice.TotalAmt).format('$0,0.00');
    let invoiceDueDate = invoice.DueDate;
    let invoiceDueDateFormatted = dateFormat(invoice.DueDate, "mmmm dS, yyyy");
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
        syncToken: invoice.SyncToken,
        email,
        emailCc,
        invoiceId,
        invoiceNumber,
        invoiceAmount,
        invoiceDueDate,
        invoiceDueDateFormatted,
        invoiceToken,
        customerName,
        companyName
      };

      console.log('are we here? ');

      let mailOptions = prepareContent(invoiceType, contextObject);

      console.log('or here? ', mailOptions);

      resolve(mailOptions);
    }else{
      adminAlertEmail.send(`The Quickbooks customer, ${companyName}, we tried to send invoice ${invoiceNumber} to, does not have an email associated or is not active...`).then(() => {
        resolve();
      }).catch((err)=>console.log(err));
    }
  }).catch((err) => {
    console.log('Error processing invoice details...', err);
  });
  return promise;
};

module.exports = processInvoiceDetails;
