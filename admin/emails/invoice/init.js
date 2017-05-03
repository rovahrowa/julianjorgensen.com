let getDetails = require('./getDetails');
let processDetails = require('./processDetails');
let sendInvoice = require('./sendInvoice');
let updateInvoice = require('./updateInvoice');

function init(invoiceId, invoiceType){
  console.log(`Preparing to send ${invoiceType} invoice email...`);
  return getDetails(invoiceId, invoiceType)
    .then(processDetails)
    .then(sendInvoice)
    .then(updateInvoice)
    .catch((err) => {
      throw Error(err);
    });
}

module.exports.send = init;
