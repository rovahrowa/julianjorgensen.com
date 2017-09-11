let moment = require('moment');
let _ = require('lodash');
let utils = require('./utils/invoiceReminderUtils');
let ENV_CONFIG = require('../../../util/util').getEnvConfig();

let applyLateFees = function (processedInvoices) {
  if (processedInvoices) {

    let invoicesPromises = processedInvoices.map((invoiceRef) => {
      return new Promise(function (resolve, reject) {

        // determine late fees quantity (based on months from due date)
        let today = moment().startOf('day');
        let invoiceDueDate = moment(invoiceRef.DueDate, 'YYYY-MM-DD');
        let lateFeesQty = Math.round(moment.duration(today - invoiceDueDate).asMonths());

        if (lateFeesQty > 0) {

          let subtotalObj = _.find(invoiceRef.Line, {
            'DetailType': 'SubTotalLineDetail'
          });
          let subtotal = subtotalObj.Amount;

          let previousLateFee = utils.searchForPreviousLateFee(invoiceRef.Line);
          console.log('previousLateFee item ref', previousLateFee);

          // If there was a previous Late fee item, increment that one
          if (previousLateFee) {
            previousLateFee.SalesItemLineDetail.Qty = lateFeesQty;

            // update total amount for late fees
            let unitPrice = (subtotal - previousLateFee.Amount) * 0.03;
            let updatedAmount = lateFeesQty * unitPrice;
            invoiceRef.Line[previousLateFee.arrOrder].Amount = updatedAmount;

            // update taxes
            console.log('tax details', JSON.stringify(invoiceRef.TxnTaxDetail));

            let taxRate = invoiceRef.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent / 100;
            console.log('tax rate', taxRate);

            invoiceRef.TxnTaxDetail.TaxLine[0].TaxLineDetail.NetAmountTaxable = subtotal + unitPrice;
            invoiceRef.TxnTaxDetail.TaxLine[0].Amount = (subtotal + unitPrice) * taxRate;
            invoiceRef.TxnTaxDetail.TotalTax = (subtotal + unitPrice) * taxRate;

            // delete the arrOrder (that was applied just above) so it doesn't cause a bug when pushing the invoiceRef to QBO
            delete previousLateFee.arrOrder;

          } else {

            let defaultTaxCode = utils.getFirstLineItemTaxCode(invoiceRef.Line);
            console.log('default tax code', defaultTaxCode);

            // Otherwise, create a new late fee line item
            invoiceRef.Line.push({
              Description: '',
              DetailType: 'SalesItemLineDetail',
              Amount: lateFeesQty * subtotal * 0.03,
              SalesItemLineDetail: {
                "ItemRef": {
                  "value": ENV_CONFIG.QBO_LATE_FEE_ITEM_REF
                },
                UnitPrice: subtotal * 0.03,
                Qty: lateFeesQty,
                "TaxCodeRef": {
                  "value": defaultTaxCode
                }
              }
            });
          }

          // Now, actually update the invoice on QuickBooks 
          // ===============================================
          console.log('line items:... ', invoiceRef.Line);
          console.log('invoiceRef: ', invoiceRef);

          qbo.updateInvoice(invoiceRef, (err, invoice) => {
            if (err) console.log('Error updating invoice: ', JSON.stringify(err));

            resolve(`Updated invoice`);
          });
        } else {
          resolve('Invoice did not need late fee applied');
        }

      });
    });

    return Promise.all(invoicesPromises).then().catch((err) => {
      console.log('Error in apply late fees: ', err);
    });
  } else {
    return null;
  }
};

module.exports = applyLateFees;
