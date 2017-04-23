let invoice = require('../../emails/invoice/init');

let sendReminders = function(invoicesToSendReminder) {

  let invoiceReminderPromises = invoicesToSendReminder.map((reminderId) => {
    return function promise() {
      return new Promise(function(resolve, reject){

        invoice.send(reminderId, 'reminder').then((data) => {
          console.log(`Invoice reminder #${reminderId} sent!`);
          resolve(reminderId);
        }).catch((err) => {
          reject('Something went wrong sending the invoice email reminder', err);
        });

      }).catch((err) => {
        throw Error(err);
      });
    }
  });

  function startPromiseSeries(promiseArr) {
    var p = Promise.resolve();
    return promiseArr.reduce(function(pacc, fn) {
      return pacc = pacc.then(fn);
    }, p);
  }

  return new Promise(function(resolve, reject) {
    startPromiseSeries(invoiceReminderPromises).then(() => {
      resolve('success sending reminders');
    }).catch((err) => {
      console.log(err);
    });
  });
};


module.exports = sendReminders;
