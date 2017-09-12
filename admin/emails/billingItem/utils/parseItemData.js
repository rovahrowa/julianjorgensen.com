let parseItemData = (item, itemType) => {
  return new Promise(function(resolve, reject) {
    if (item) {
      let customerId = item.CustomerRef.value;
      qbo.getCustomer(customerId, (err, customer) => {
        if (customer) {
          resolve({
            itemType,
            item,
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
