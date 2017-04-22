let getInvoiceDetails = require('./getInvoiceDetails');
let processInvoiceDetails = require('./processInvoiceDetails');
let sendInvoice = require('./sendInvoice');

function send(invoiceId){
  console.log('Preparing to send invoice email...');
  return getInvoiceDetails(invoiceId).then(processInvoiceDetails).then(sendInvoice);
}

module.exports.send = send;
