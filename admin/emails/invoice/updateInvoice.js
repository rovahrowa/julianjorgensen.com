let moment = require('moment');
let util = require('../../../util/util');

function searchObjectsAndApplyArrOrder(nameKey, prop, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][prop] === nameKey) {
      arr[i].arrOrder = i;
      return arr[i];
    }
  }
}

let updateInvoice = function (invoiceRef) {
  return new Promise(function (resolve, reject) {
    console.log('invoiceREf: ', invoiceRef);
    let updatedInvoiceData = {
      CustomField: [{
        "DefinitionId": "2",
        "Name": "last sent",
        "Type": "StringType",
        "StringValue": moment(Date.now()).format('DD-MM-YYYY')
      }],
      "EmailStatus": "EmailSent",
    };
    Object.assign(invoiceRef, updatedInvoiceData);


    let subtotalObj = util.searchObjects('SubTotalLineDetail', 'DetailType', invoiceRef.Line);
    let subtotal = subtotalObj.Amount;
    let lateFeesQty = 1;

    let previousLateFees = searchObjectsAndApplyArrOrder('Late fee', 'Description', invoiceRef.Line);
    if (previousLateFees) {
      previousLateFees.SalesItemLineDetail.Qty++;
      let updatedLateFeesQty = +invoiceRef.Line[previousLateFees.arrOrder].SalesItemLineDetail.Qty;

      // update total amount for late fees
      let unitPrice = invoiceRef.Line[previousLateFees.arrOrder].SalesItemLineDetail.UnitPrice;
      let updatedAmount = updatedLateFeesQty * unitPrice;
      invoiceRef.Line[previousLateFees.arrOrder].Amount = updatedAmount;

      // update taxes
      let taxRate = invoiceRef.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent / 100;
      invoiceRef.TxnTaxDetail.TaxLine[0].TaxLineDetail.NetAmountTaxable = subtotal + unitPrice;
      invoiceRef.TxnTaxDetail.TaxLine[0].Amount = (subtotal + unitPrice) * taxRate;
      invoiceRef.TxnTaxDetail.TotalTax = (subtotal + unitPrice) * taxRate;

      // delete the arrOrder (that was applied just above) so it doesn't cause a bug when pushing the invoiceRef to QBO
      delete previousLateFees.arrOrder;
    } else {
      // create the late fee line item
      invoiceRef.Line.push({
        Description: 'Late fee',
        DetailType: 'SalesItemLineDetail',
        Amount: lateFeesQty * subtotal * 0.03,
        SalesItemLineDetail: {
          "ItemRef": {
            "value": "29"
          },
          UnitPrice: subtotal * 0.03,
          Qty: lateFeesQty,
          "TaxCodeRef": {
            "value": "5"
          }
        }
      });
    }

    console.log('line items:... ', invoiceRef.Line);
    console.log('invoiceRef: ', invoiceRef);

    qbo.updateInvoice(invoiceRef, (err, invoice) => {
      console.log(err);
      if (err) console.log('Error updating invoice: ', err);

      resolve(`Updated invoice`);
    });
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = updateInvoice;
