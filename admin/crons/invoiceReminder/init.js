let getInvoices = require('./getInvoices');
let processInvoices = require('./processInvoices');
let sendReminders = require('./sendReminders');

function init(){
  console.log('Sending invoice reminders...');
  return getInvoices()
    .then(processInvoices)
    .then(sendReminders)
    .catch((err) => {
      throw Error(err);
    });
}

module.exports.init = init;
