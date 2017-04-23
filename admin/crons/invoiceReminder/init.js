let getInvoices = require('./getInvoices');
let processInvoices = require('./processInvoices');
let sendReminders = require('./sendReminders');
let sendSummary = require('./sendSummary');

function init(){
  console.log('Sending invoice reminders...');
  return getInvoices()
    .then(processInvoices)
    .then(sendReminders)
    // .then(sendSummary)
    .catch((err) => {
      throw Error(err);
    });
}

module.exports.init = init;
