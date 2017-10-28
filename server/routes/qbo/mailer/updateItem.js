import qbo from '../index';
import moment from 'moment';
import { envConfig } from '../../../utils/utils';

export default (passedData) => {
  const {
    itemType,
    itemRef,
  } = passedData;
  if (itemRef && itemType) {
    return new Promise((resolve, reject) => {
      const updatedItemData = {
        CustomField: [{
          DefinitionId: '2',
          Name: envConfig.QBO_SENT_LABEL,
          Type: 'StringType',
          StringValue: moment(Date.now()).format('DD-MM-YYYY'),
        }],
        EmailStatus: 'EmailSent',
      };
      Object.assign(itemRef, updatedItemData);

      if (itemType === 'estimate') {
        // update estimate
        qbo.updateEstimate(itemRef, (err, item) => {
          if (err) console.log('Error updating estimate: ', JSON.stringify(err));
          resolve();
        });
      } else if (itemType === 'invoice') {
        // update invoice
        qbo.updateInvoice(itemRef, (err, item) => {
          if (err) console.log('Error updating invoice: ', JSON.stringify(err));
          resolve();
        });
      } else {
        reject();
      }
    }).catch((err) => {
      reject(err);
    });
  }

  return true;
};
