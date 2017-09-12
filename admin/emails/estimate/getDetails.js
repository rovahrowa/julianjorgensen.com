let getEstimateDetails = function(estimateId, estimateType) {
  let promise = new Promise(function(resolve, reject) {

    qbo.getEstimate(estimateId, (err, estimate) => {
      if (estimate) {
        let customerId = estimate.CustomerRef.value;
        qbo.getCustomer(customerId, (err, customer) => {
          if (customer) {
            customer = customer;
            estimate = estimate;
            resolve([customer, estimate, estimateType]);
          } else {
            console.log('error', err);
            // throw new Error('While sending the estimate email, there was an error getting quickbooks customer: ' + err);
          }
        });
      } else {
        console.log('error', err);
        // throw new Error('While sending the estimate email, there was an error getting quickbooks estimate: ' + err);
      }
    });
  }).catch((err) => {
    throw Error('Error getting estimate details...');
  });
  return promise;
};

module.exports = getEstimateDetails;
