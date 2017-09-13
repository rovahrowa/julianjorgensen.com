let parseItemData = ({
  item,
  itemType,
  eventType
}) => {
  return new Promise(function(resolve, reject) {
    if (item) {
      let customerId = item.CustomerRef.value;
      qbo.getCustomer(customerId, (err, customer) => {
        if (customer) {
          resolve({
            item,
            itemType,
            eventType,
            customer
          });
        } else {
          reject(err);
        }
      });
    } else {
      reject('No Invoice/Estimate item found.');
    }
  });
};

module.exports = parseItemData;
