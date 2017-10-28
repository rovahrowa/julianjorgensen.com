let moment = require('moment');
let _ = require('lodash');
let util = require('../../utils/utils');
import { envConfig } from '../../utils/utils';

let processInvoices = function (invoices) {
  if (invoices) {
    let processedInvoices = invoices.filter((invoice) => {
      // today
      let today = moment().startOf('day');

      // get paid date
      let paidDateObj = _.find(invoice.CustomField, {
        'Name': envConfig.QBO_PAID_LABEL
      });
      let paidDate = paidDateObj ? paidDateObj.StringValue : null;

      // get last sent date
      let lastSentDateObj = _.find(invoice.CustomField, {
        'Name': envConfig.QBO_SENT_LABEL
      });
      let lastSentDate = lastSentDateObj ? lastSentDateObj.StringValue : null;

      // if its already been paid just resolve
      if (paidDate) {
        return false;
      }

      // if it's never been sent, then just resolve 
      if (!lastSentDate) {
        return invoice;
      }

      // if it was sent before
      if (lastSentDate) {
        lastSentDate = moment(lastSentDate, 'DD-MM-YYYY'); //parse date to moment
        let daysSinceSentLast = Math.round(moment.duration(today - lastSentDate).asDays());

        if (daysSinceSentLast > 7) {
          return invoice;
        } else {
          return false;
        }
      }
    });

    return processedInvoices;
  } else {
    return null;
  }
};

module.exports = processInvoices;
