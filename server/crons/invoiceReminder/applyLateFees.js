import moment from 'moment';
import _ from 'lodash';
import { getFirstLineItemTaxCode, searchForPreviousLateFee } from './utils/invoiceReminderUtils';
import { envConfig } from '../../utils/utils';

export default (processedInvoices) => {
  if (processedInvoices.length > 0) {
    const invoicesPromises = processedInvoices.map(invoiceRef => new Promise((resolve, reject) => {
      // determine late fees quantity (based on months from due date)
      const today = moment().startOf('day');
      const invoiceDueDate = moment(invoiceRef.DueDate, 'YYYY-MM-DD');
      const lateFeesQty = Math.round(moment.duration(today - invoiceDueDate).asMonths());

      if (lateFeesQty > 0) {
        const subtotalObj = _.find(invoiceRef.Line, {
          DetailType: 'SubTotalLineDetail',
        });
        const subtotal = subtotalObj.Amount;

        const previousLateFee = searchForPreviousLateFee(invoiceRef.Line);

        // If there was a previous Late fee item, increment that one
        if (previousLateFee) {
          previousLateFee.SalesItemLineDetail.Qty = lateFeesQty;

          // update total amount for late fees
          const unitPrice = (subtotal - previousLateFee.Amount) * 0.03;
          const updatedAmount = lateFeesQty * unitPrice;
          invoiceRef.Line[previousLateFee.arrOrder].Amount = updatedAmount;

          // update taxes
          const taxRate = invoiceRef.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent / 100;
          invoiceRef.TxnTaxDetail.TaxLine[0].TaxLineDetail.NetAmountTaxable = subtotal + unitPrice;
          invoiceRef.TxnTaxDetail.TaxLine[0].Amount = (subtotal + unitPrice) * taxRate;
          invoiceRef.TxnTaxDetail.TotalTax = (subtotal + unitPrice) * taxRate;

          // delete the arrOrder (that was applied just above) so it doesn't
          // cause a bug when pushing the invoiceRef to QBO
          delete previousLateFee.arrOrder;
        } else {
          const defaultTaxCode = getFirstLineItemTaxCode(invoiceRef.Line);

          // Otherwise, create a new late fee line item
          invoiceRef.Line.push({
            Description: '',
            DetailType: 'SalesItemLineDetail',
            Amount: lateFeesQty * subtotal * 0.03,
            SalesItemLineDetail: {
              ItemRef: {
                value: envConfig.QBO_LATE_FEE_ITEM_REF,
              },
              UnitPrice: subtotal * 0.03,
              Qty: lateFeesQty,
              TaxCodeRef: {
                value: defaultTaxCode,
              },
            },
          });
        }

        // Now, actually update the invoice on QuickBooks
        // ===============================================
        qbo.updateInvoice(invoiceRef, (err, invoice) => {
          if (err) console.log('Error updating invoice: ', JSON.stringify(err));

          resolve(invoiceRef);
        });
      } else {
        resolve(invoiceRef);
      }
    }));

    return Promise.all(invoicesPromises).then().catch((err) => {
      console.log('Error in apply late fees: ', err);
    });
  }
  return null;
};
