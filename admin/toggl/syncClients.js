let syncClients = function(passedData) {

  let updatedClients = [];
  let clients = passedData.clients.map((client, index) => {
    return function promise() {
      return new Promise(function(resolve, reject){
        console.log('Searching QBO for customer: ', client.name);
        qbo.findCustomers([
          {field: 'fetchAll', value: true},
          {field: 'CompanyName', value: `${client.name}%`, operator: 'LIKE'}
        ], function(err, response) {
          console.log('qbo response: ', response);
          if (response.QueryResponse.maxResults){
            console.log('found!');
            let matchedCustomers = response.QueryResponse.Customer;
            client.qboId = matchedCustomers[0].Id;
            updatedClients.push(client);
            resolve();
          }else{
            qbo.createCustomer({
              'DisplayName': client.name,
              'CompanyName': client.name,
              'CurrencyRef': {value: client.currency}
            }, function(err, customer) {
              console.log('Created a new customer! ', customer.Id);
              client.qboId = customer.Id;
              updatedClients.push(client);
              resolve();
            });
          }
          // if (!customers.QueryResponse){
          // }else{
          //   let matchedCustomers = customers.QueryResponse.Customer;
          //   console.log('matched customers: ', matchedCustomers);
          //   timeEntry.clientId = matchedCustomers[0].Id;
          // }
        })
        .catch((error) => {
          throw error('error finding QBO customer: ', error);
        });
      });
    }
  });

  function startPromiseSeries(promiseArr) {
    var p = Promise.resolve();
    return promiseArr.reduce(function(pacc, fn) {
      return pacc = pacc.then(fn);
    }, p);
  }

  return new Promise(function(resolve, reject) {
    startPromiseSeries(clients).then(() => {
      resolve({
        timeEntries: passedData.timeEntries,
        workspace: passedData.workspace,
        clients: updatedClients
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

module.exports = syncClients;
