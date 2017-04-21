let mapEntriesWithQuickbooksCustomers = function(processedTimeEntries) {
  let timeEntriesPromises = processedTimeEntries.map((timeEntry) => {
    return new Promise(function(resolve, reject){
      // find customer on quick books
      qbo.findCustomers([
        {field: 'fetchAll', value: true},
        {field: 'CompanyName', value: `${timeEntry.clientName}%`, operator: 'LIKE'}
      ], function(err, customers) {
        if (customers.QueryResponse.Customer){
          let matchedCustomers = customers.QueryResponse.Customer;
          console.log('matched customers: ', matchedCustomers);
          timeEntry.clientId = matchedCustomers[0].Id;
          resolve(timeEntry);
        }else{
          // create qbo customer
          console.log('creating QBO customer...', timeEntry.clientName);
          qbo.createCustomer({
            'DisplayName': timeEntry.clientName,
            'CompanyName': timeEntry.clientName,
            'CurrencyRef': {value: timeEntry.currency} // possibly need to also specify "name: 'Canadian Dollar'"
          }, function(err, customer) {
            if (err) reject(err);
            console.log('\n\nCreated new customer: ', customer.Id);

            timeEntry.clientId = customer.Id;
            resolve(timeEntry);
          });
        }
      });
    }).catch((err) => {
      reject(err);
    });
  });


  var results = Promise.all(timeEntriesPromises);
  results.then((data) => {
  }).catch((err) => {
    console.log('Error in mapEntriesWithQuickbooksCustomers: ', err);
  });

  return results;
};

module.exports = mapEntriesWithQuickbooksCustomers;
