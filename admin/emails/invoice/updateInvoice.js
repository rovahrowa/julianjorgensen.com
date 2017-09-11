let moment = require('moment');
let util = require('../../../util/util');
let ENV_CONFIG = util.getEnvConfig();

let updateInvoice = (invoiceRef) => {
  return new Promise((resolve, reject) => {
    let updatedInvoiceData = {
      CustomField: [{
        "DefinitionId": "2",
        "Name": ENV_CONFIG.QBO_SENT_LABEL,
        "Type": "StringType",
        "StringValue": moment(Date.now()).format('DD-MM-YYYY')
      }],
      "EmailStatus": "EmailSent",
    };
    Object.assign(invoiceRef, updatedInvoiceData);

    qbo.updateInvoice(invoiceRef, (err, invoice) => {
      if (err) console.log('Error updating invoice: ', JSON.stringify(err));

      resolve(`Updated invoice`);
    });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = updateInvoice;
