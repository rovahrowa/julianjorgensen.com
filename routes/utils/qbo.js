let ENV_CONFIG = require('../util/util').getEnvConfig();
let _ = require('lodash');
let billingItemMailer = require('../../admin/emails/billingItem/init');

function processItemData(item) {
  return new Promise((resolve, reject) => {
    if (!item) {
      reject();
    }

    let customerId = item.CustomerRef.value;
    qbo.getCustomer(customerId, (error, customer) => {
      if (error) reject(error);

      let itemAndCustomer = {
        item: item,
        customer: customer
      };
      resolve(itemAndCustomer);
    });
  });
};
module.exports.processItemData = processItemData;


function mailItem(item, eventType) {
  return new Promise((resolve, reject) => {
    if (!item) {
      reject();
    }

    console.log('got item details from webhook: ', item);

    // get last sent date
    let lastSentDateObj = _.find(item.CustomField, {
      'Name': ENV_CONFIG.QBO_SENT_LABEL
    });
    let lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

    console.log('last sent date', lastSentDate);
    console.log('send item?', !lastSentDate);

    if (!lastSentDate) {
      // send the item
      billingItemMailer.send(item.Id, eventType).then(() => {
        resolve(`Billing item #${item.DocNumber} sent!`);
      }).catch((err) => {
        reject(`Error sending billing item #${Item.DocNumber}...`);
      });
    }
  });
};
module.exports.mailItem = mailItem;
