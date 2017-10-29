import _ from 'lodash';
import qbo from '../routes/qbo';
import { envConfig } from './utils';
import billingItemMailer from '../routes/qbo/mailer';

export const processItemData = item => new Promise((resolve, reject) => {
  if (!item) {
    reject();
  }

  const customerId = item.CustomerRef.value;
  qbo.getCustomer(customerId, (error, customer) => {
    if (error) reject(error);

    const itemAndCustomer = {
      item,
      customer,
    };
    resolve(itemAndCustomer);
  });
});

export function mailItem({
  item,
  itemType,
  eventType,
}) {
  return new Promise((resolve, reject) => {
    console.log('mailing item...');
    if (!item) {
      reject();
    }

    // get last sent date
    const lastSentDateObj = _.find(item.CustomField, {
      'Name': envConfig.QBO_SENT_LABEL,
    });
    const lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;
    console.log('envConfig', envConfig);
    console.log('lastSentDate', lastSentDate);
    console.log('balance', item.Balance);

    if (!lastSentDate && item.Balance > 0) {
      // send the item
      billingItemMailer({
        id: item.Id,
        itemType,
        eventType,
      }).then(() => {
        console.log('billing item sent');
        resolve(`Billing item #${item.DocNumber} sent!`);
      }).catch((err) => {
        console.log('error', err);
        reject(new Error(`Error sending billing item #${item.DocNumber}...`));
      });
    } else {
      resolve('Nothing to send');
    }
  }).catch(err => err);
}
