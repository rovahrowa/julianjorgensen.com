import qbo from '../../index';

export default ({
  item,
  itemType,
  eventType,
}) => new Promise((resolve, reject) => {
  if (item) {
    const customerId = item.CustomerRef.value;
    qbo.getCustomer(customerId, (err, customer) => {
      if (customer) {
        resolve({
          item,
          itemType,
          eventType,
          customer,
        });
      } else {
        reject(err);
      }
    });
  } else {
    reject(new Error('No Invoice/Estimate item found.'));
  }
});
