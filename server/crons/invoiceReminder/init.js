let getInvoices = require('./getInvoices');
let processInvoices = require('./processInvoices');
let applyLateFees = require('./applyLateFees');
let sendReminders = require('./sendReminders');

function init() {
  console.log('Sending invoice reminders...');
  return getInvoices()
    .then(processInvoices)
    .then(applyLateFees)
    .then(sendReminders)
    .catch((err) => {
      throw Error(err);
    });
}

module.exports.init = init;
