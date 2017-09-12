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
