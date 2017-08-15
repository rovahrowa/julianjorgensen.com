let moment = require('moment');
let _ = require('lodash');

let processInvoices = function(overdueInvoices) {
  let promise = new Promise(function(resolve, reject) {
    let invoicesToSendReminder = [];

    let today = moment().startOf('day');

    overdueInvoices.map((invoice) => {
      let paidDateObj = _.find(invoice.CustomField, {'Name': 'paid date'});
      let paidDate = paidDateObj ? paidDateObj.StringValue : null;

      let lastSentDateObj = _.find(invoice.CustomField, {'Name': 'last sent'});
      let lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

      if(!paidDate){
        if (lastSentDate){
          lastSentDate = moment(lastSentDate, 'DD-MM-YYYY'); //correct formatting
          let daysSinceSentLast = Math.round(moment.duration(today - lastSentDate).asDays());

          if (daysSinceSentLast > 7){
            invoicesToSendReminder.push(invoice.Id);
          }
        }else{
          invoicesToSendReminder.push(invoice.Id);
        }
      }
    });

    resolve(invoicesToSendReminder);
  }).catch((err) => {
    console.log('Error processing reminder invoice...', err);
  });
  return promise;
};

module.exports = processInvoices;
