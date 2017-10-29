import moment from 'moment';
import billingMailer from '../../routes/qbo/mailer';

export default (invoices) => {
  if (invoices) {
    const promises = invoices.map(invoiceRef => new Promise((resolve, reject) => {
      const today = moment().startOf('day');
      const dueDate = moment(invoiceRef.DueDate, 'YYYY-MM-DD');
      const daysTillOverdue = moment.duration(dueDate - today).asDays();

      let eventType;
      if (daysTillOverdue >= 0) {
        eventType = 'reminder';
      } else {
        eventType = 'overdue';
      }

      // now, send the invoice
      billingMailer.send({
        id: invoiceRef.Id,
        itemType: 'invoice',
        eventType,
      }).then((data) => {
        resolve(`Invoice reminder #${invoiceRef.Id} sent!`);
      }).catch((err) => {
        reject(new Error(`Something went wrong sending the invoice email reminder: ${err}`));
      });
    }));

    return Promise.all(promises).then().catch((err) => {
      console.log('Error in sending invoice reminders: ', err);
    });
  }
  return false;
};
