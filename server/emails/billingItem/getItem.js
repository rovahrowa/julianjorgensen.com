let parseItemData = require('./utils/parseItemData');

let getItem = function({
  id,
  itemType,
  eventType
}) {
  return new Promise(function(resolve, reject) {
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
        }).catch((err) => {
          reject(err);
        });
      });
    } else {
      // invoice
      qbo.getInvoice(id, (err, item) => {
        parseItemData({
          item,
          itemType,
          eventType
        }).then((parsedData) => {
          resolve(parsedData);
        }).catch((err) => {
          reject(err);
        });
      });
    }
  });
};

module.exports = getItem;
