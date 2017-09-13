let prepareContent = require('./utils/prepareContent');
let adminAlertEmail = require('../adminAlertEmail');

let processItem = function(passedData) {
  return new Promise(function(resolve, reject) {
    console.log('processing item..', passedData);
    let preparedMailContent = prepareContent(passedData);
    if (preparedMailContent) {
      resolve(preparedMailContent);
    } else {
      adminAlertEmail.send(`The Quickbooks customer, ${passedData.customer.companyName}, we tried to send invoice ${passedData.item.Number} to, does not have an email associated or is not active...`).then(() => {
        resolve();
      }).catch((err) => console.log(err));
    }
  });
};

module.exports = processItem;
