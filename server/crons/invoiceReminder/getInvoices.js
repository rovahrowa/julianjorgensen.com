import moment from 'moment';
import qbo from '../../routes/qbo';

export default () => new Promise((resolve, reject) => {
  const oneWeekFromNow = moment(Date.now()).add(1, 'w').format('YYYY-MM-DD');

  qbo.findInvoices([
    {
      field: 'Balance',
      value: '0',
      operator: '>',
    },
    {
      field: 'DueDate',
      value: oneWeekFromNow,
      operator: '<',
    },
  ], (err, data) => {
    if (err) {
      reject(new Error(err));
    } else {
      resolve(data.QueryResponse.Invoice);
    }
  });
});
