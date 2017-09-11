let moment = require('moment');
let _ = require('lodash');
let util = require('../../../util/util');
let ENV_CONFIG = util.getEnvConfig();

let processInvoices = function (overdueInvoices) {
  console.log('processing invoices...', overdueInvoices);

  if (overdueInvoices) {
    let promise = new Promise(function (resolve, reject) {
      let invoicesToSendReminder = [];

      let today = moment().startOf('day');

      overdueInvoices.map((invoice) => {
        let paidDateObj = _.find(invoice.CustomField, {
          'Name': ENV_CONFIG.QBO_PAID_LABEL
        });
        let paidDate = paidDateObj ? paidDateObj.StringValue : null;

        let lastSentDateObj = _.find(invoice.CustomField, {
          'Name': ENV_CONFIG.QBO_SENT_LABEL
        });
        let lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

        if (!paidDate) {
          if (lastSentDate) {
            lastSentDate = moment(lastSentDate, 'DD-MM-YYYY'); //parse date to moment
            let daysSinceSentLast = Math.round(moment.duration(today - lastSentDate).asDays());

            if (daysSinceSentLast > 7) {
              invoicesToSendReminder.push(invoice);
            }
          } else {
            invoicesToSendReminder.push(invoice);
          }
        }
      });

      resolve(invoicesToSendReminder);
    }).catch((err) => {
      console.log('Error processing reminder invoice...', err);
    });
    return promise;
  } else {
    return null;
  }
};

module.exports = processInvoices;
