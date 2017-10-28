import qbo from '../index';
import parseItemData from './utils/parseItemData';

export default ({
  id,
  itemType,
  eventType,
}) => new Promise((resolve, reject) => {
  console.log('getting item details for type', itemType);
  if (itemType === 'estimate') {
    // estimate
    qbo.getEstimate(id, (err, item) => {
      if (err) reject(err);
      console.log('err', JSON.stringify(err));
      console.log('got estimate', item);
      parseItemData({
        item,
        itemType,
        eventType
      }).then((parsedData) => {
        console.log('parsedData from getItem.js', parsedData);
        resolve(parsedData);
      }).catch((err2) => {
        reject(err2);
      });
    });
  } else {
    // invoice
    qbo.getInvoice(id, (err, item) => {
      parseItemData({
        item,
        itemType,
        eventType,
      }).then((parsedData) => {
        resolve(parsedData);
      }).catch((err2) => {
        reject(err2);
      });
    });
  }
});
