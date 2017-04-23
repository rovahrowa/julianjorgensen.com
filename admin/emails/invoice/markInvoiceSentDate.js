let moment = require('moment');

let markInvoiceSentDate = function(invoiceRef) {
  let promise = new Promise(function(resolve, reject){
    let updatedInvoiceData = {
      CustomField: [
        {
          "DefinitionId": "2",
          "Name": "reminded",
          "Type": "StringType",
          "StringValue": moment(Date.now()).format('DD-MM-YYYY')
        }
      ],
      "EmailStatus": "EmailSent"
    };
    Object.assign(invoiceRef, updatedInvoiceData);

    console.log('invoiceRef: ', invoiceRef);

    qbo.updateInvoice(invoiceRef, (err, invoice) => {
      if (err) console.log('Error updating invoice: ', err);

      resolve(`Updated invoice`);
    });
  }).catch((err) => {
    console.log(err);
  });
  return promise;
};

module.exports = markInvoiceSentDate;
