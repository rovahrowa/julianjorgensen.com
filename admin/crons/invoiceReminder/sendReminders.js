let moment = require('moment');
let invoice = require('../../emails/invoice/init');

let sendReminders = function (invoices) {
  if (invoices) {
    let promises = invoices.map((invoice) => {
      return new Promise(function (resolve, reject) {

        let today = moment().startOf('day');
        let dueDate = moment(invoice.DueDate, 'YYYY-MM-DD');
        let daysTillOverdue = moment.duration(dueDate - today).asDays();

        let invoiceType;
        if (daysTillOverdue >= 0) {
          invoiceType = 'reminder';
        } else {
          invoiceType = 'overdue';
        }

        // now, send the invoice
        invoice.send(invoice.Id, invoiceType).then((data) => {
          resolve(`Invoice reminder #${invoice.Id} sent!`);
        }).catch((err) => {
          reject('Something went wrong sending the invoice email reminder', err);
        });

      });
    });

    return Promise.all(promises).then().catch((err) => {
      console.log('Error in sending invoice reminders: ', err);
    });
  } else {
    return false;
  }
};

module.exports = sendReminders;
