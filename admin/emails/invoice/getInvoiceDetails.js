let getInvoiceDetails = function(invoiceId) {
  let promise = new Promise(function(resolve, reject){

    qbo.getInvoice(invoiceId, (err, invoice) => {
      if (invoice){
        let customerId = invoice.CustomerRef.value;
        qbo.getCustomer(customerId, (err, customer) => {
          if(customer){
            customer = customer;
            invoice = invoice;
            resolve([customer, invoice]);
          }else{
            console.log('error', err);
            reject('While sending the invoice email, there was an error getting quickbooks customer: ' + err);
          }
        });
      }else{
        console.log('error', err);
        reject('While sending the invoice email, there was an error getting quickbooks invoice: ' + err);
      }
    });

  });
  return promise;
};

module.exports = getInvoiceDetails;
