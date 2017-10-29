import getInvoices from './getInvoices';
import processInvoices from './processInvoices';
import applyLateFees from './applyLateFees';
import sendReminders from './sendReminders';

export default () => {
  console.log('starting invoice reminder...');
  getInvoices().then(processInvoices)
    .then(applyLateFees)
    .then(sendReminders)
    .catch((err) => {
      throw Error(err);
    });
}
