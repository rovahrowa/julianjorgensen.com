let moment = require('moment');

let getInvoices = function () {
  console.log('getting invoices...');
  let promise = new Promise(function (resolve, reject) {
    let oneWeekFromNow = moment(Date.now()).add(1, 'w').format('YYYY-MM-DD');

    qbo.findInvoices([{
        field: 'Balance',
        value: '0',
        operator: '>'
      },
      {
        field: 'DueDate',
        value: oneWeekFromNow,
        operator: '<'
      }
    ], (err, data) => {
      if (err) {
        reject('error', err);
      } else {
        resolve(data.QueryResponse.Invoice);
      }
    });
  }).catch((err) => {
    throw Error(err);
  });
  return promise;
};

module.exports = getInvoices;
