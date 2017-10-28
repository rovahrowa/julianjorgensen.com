import { envConfig } from '../../../utils/utils';

function searchForPreviousLateFee(lineItems) {
  return lineItems.filter((item, index) => {
    // has to be a sales item (not subtotal, discount or any of the other summary line items)
    if (!item.SalesItemLineDetail) {
      return false;
    }

    // description has to match "Late fee"
    if (item.SalesItemLineDetail.ItemRef.value !== envConfig.QBO_LATE_FEE_ITEM_REF) {
      return false
    }

    // The quantity of the previous late fee can't be less than 1
    if (item.SalesItemLineDetail.Qty < 1) {
      return false;
    }

    // append arrOrder to the late fee item, so we can reference it properly later
    item.arrOrder = index;

    // return the found item
    return item;
  })[0];
};
module.exports.searchForPreviousLateFee = searchForPreviousLateFee;


function getFirstLineItemTaxCode(lineItems) {
  return lineItems.filter((item, index) => {
    // has to be a sales item (not subtotal, discount or any of the other summary line items)
    if (!item.SalesItemLineDetail) {
      return false;
    }

    // The quantity of the previous late fee can't be less than 1
    if (item.SalesItemLineDetail.Qty < 1) {
      return false;
    }

    // return the found item
    return item;
  })[0].SalesItemLineDetail.TaxCodeRef.value;
};
module.exports.getFirstLineItemTaxCode = getFirstLineItemTaxCode;
