import moment from 'moment';
import _ from 'lodash';
import { envConfig } from '../../utils/utils';

export default (invoices) => {
  if (invoices) {
    const processedInvoices = invoices.filter((invoice) => {
      // today
      const today = moment().startOf('day');

      // get paid date
      const paidDateObj = _.find(invoice.CustomField, {
        Name: envConfig.QBO_PAID_LABEL,
      });
      const paidDate = paidDateObj ? paidDateObj.StringValue : null;

      // get last sent date
      const lastSentDateObj = _.find(invoice.CustomField, {
        Name: envConfig.QBO_SENT_LABEL,
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
        lastSentDate = moment(lastSentDate, 'DD-MM-YYYY'); // parse date to moment
        const daysSinceSentLast = Math.round(moment.duration(today - lastSentDate).asDays());

        if (daysSinceSentLast > 7) {
          return invoice;
        }

        return false;
      }
      return true;
    });

    return processedInvoices;
  }
  return null;
};
