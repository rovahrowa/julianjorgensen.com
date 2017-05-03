let moment = require('moment');

function prepareContent(invoiceType, contextObject){
  let {syncToken, email, emailCc, invoiceId, invoiceNumber, customerName, invoiceDueDate, invoiceLineItems, invoiceTaxDetails} = contextObject;

  console.log('invoiceType: ', invoiceType);

  if (invoiceType == 'new'){
    subject = 'Invoice #' + invoiceNumber;
    invoiceTemplate = 'invoice.pug';
  }else{
    subject = 'Invoice overdue!';
    invoiceTemplate = 'invoiceReminder.pug';
    timeOverdue = moment(invoiceDueDate, 'YYYY-MM-DD').fromNow();
  }

  let mailOptions = {
    from: {name: 'Julian Jorgensen', address: 'me@julianjorgensen.com'},
    to: [{name:customerName, address:email}], // An array if you have multiple recipients.
    subject: subject,
    invoiceRef: {
      Id: invoiceId,
      SyncToken: syncToken,
      sparse: true,
      Line: invoiceLineItems,
      TxnTaxDetail: invoiceTaxDetails
    },
    template: {
      name: `./admin/emails/templates/${invoiceTemplate}`,
      engine: 'pug',
      context: contextObject
    }
  };
  // if CC exists, then also include that to the object
  if (emailCc){
    Object.assign({cc: emailCc}, mailOptions);
  }
  return mailOptions;
}

module.exports = prepareContent;
