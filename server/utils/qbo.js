import _ from 'lodash';
import qbo from '../routes/qbo';
import { envConfig } from './utils';
import billingItemMailer from '../emails/billingItem/init';

export const processItemData = (item) => {
  return new Promise((resolve, reject) => {
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
};

export function mailItem({
  item,
  itemType,
  eventType,
}) {
  return new Promise((resolve, reject) => {
    if (!item) {
      reject();
    }

    // get last sent date
    const lastSentDateObj = _.find(item.CustomField, {
      Name: envConfig.QBO_SENT_LABEL,
    });
    const lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

    if (!lastSentDate && item.Balance > 0) {
      // send the item
      billingItemMailer.send({
        id: item.Id,
        itemType,
        eventType
      }).then(() => {
        resolve(`Billing item #${item.DocNumber} sent!`);
      }).catch((err) => {
        reject(`Error sending billing item #${Item.DocNumber}...`);
      });
    } else {
      resolve('Nothing to send');
    }
  }).catch(err => err);
}
