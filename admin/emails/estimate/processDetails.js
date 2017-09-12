let util = require('../../../util/util');
let numeral = require('numeral');
let moment = require('moment');
let prepareContent = require('./prepareContent');
let adminAlertEmail = require('../adminAlertEmail');

let processEstimateDetails = function(passedData) {
  console.log('processing estimate...', passedData);
  let promise = new Promise(function(resolve, reject) {

    let customer = passedData[0];
    let estimate = passedData[1];
    let estimateType = passedData[2];

    // Create token for email button
    let estimateId = estimate.Id;
    let secretVariable = 'Item' + estimate.Id;
    let estimateToken = util.createToken(secretVariable);

    // Create variables
    let estimateNumber = estimate.DocNumber;
    let estimateAmount = numeral(estimate.Balance).format('$0,0.00');
    let currency = estimate.CurrencyRef.value;
    let expirationDate = estimate.ExpirationDate;
    let expirationDateFormatted = moment(estimate.ExpirationDate, "YYYY-MM-DD").format('mmmm dS, yyyy');
    let customerName = customer.GivenName;
    let companyName = customer.CompanyName;

    // if estimate has an email then use that, otherwise use the email(s) associated with the customer
    let email;
    let emailCc;
    if (estimate.BillEmail) {
      email = estimate.BillEmail.Address;
    } else if (customer.PrimaryEmailAddr) {
      email = customer.PrimaryEmailAddr.Address;
    } else {
      email = null;
    }
    if (estimate.BillEmailCc) {
      emailCc = estimate.BillEmailCc.Address;
    } else {
      emailCc = null;
    }

    // if customer is active and has an email (or the estimate has an email specified)
    if (customerIsActive && email) {
      let contextObject = {
        syncToken: estimate.SyncToken,
        email,
        emailCc,
        estimateId,
        estimateNumber,
        estimateAmount,
        expirationDate,
        expirationDateFormatted,
        estimateToken,
        currency,
        customerName,
        companyName,
        estimateLineItems: estimate.Line,
        estimateTaxDetails: estimate.TxnTaxDetail
      };

      let mailOptions = prepareContent(estimateType, contextObject);
      resolve(mailOptions);
    } else {
      adminAlertEmail.send(`The Quickbooks customer, ${companyName}, we tried to send estimate ${estimateNumber} to, does not have an email associated or is not active...`).then(() => {
        resolve();
      }).catch((err) => console.log(err));
    }
  }).catch((err) => {
    console.log('Error processing estimate details...', err);
  });
  return promise;
};

module.exports = processEstimateDetails;
