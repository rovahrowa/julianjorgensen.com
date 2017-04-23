let getInvoiceDetails = function(invoiceId, invoiceType) {
  let promise = new Promise(function(resolve, reject){

    qbo.getInvoice(invoiceId, (err, invoice) => {
      if (invoice){
        let customerId = invoice.CustomerRef.value;
        qbo.getCustomer(customerId, (err, customer) => {
          if(customer){
            customer = customer;
            invoice = invoice;
            resolve([customer, invoice, invoiceType]);
          }else{
            console.log('error', err);
            // throw new Error('While sending the invoice email, there was an error getting quickbooks customer: ' + err);
          }
        });
      }else{
        console.log('error', err);
        // throw new Error('While sending the invoice email, there was an error getting quickbooks invoice: ' + err);
      }
    });
  }).catch((err) => {
    throw Error('Error getting invoice details...');
  });
  return promise;
};

module.exports = getInvoiceDetails;
