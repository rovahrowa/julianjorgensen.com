import axios from 'axios';
import _ from 'lodash';

// Get item details from QuickBooks
export const getItem = (type, id, token) => new Promise((resolve, reject) => {
  axios.get(`/get-billing-item/${type}/${id}?token=${token}`)
    .then((response) => {
      const payload = response.data;

      // if item has a email then use that, otherwise use the email(s) associated with the customer
      let email;
      if (payload.item.BillEmail) {
        email = payload.item.BillEmail.Address;
      } else if (payload.customer.PrimaryEmailAddr) {
        email = payload.customer.PrimaryEmailAddr.Address;
      } else {
        email = null;
      }

      const paidDateObj = _.find(payload.item.CustomField, {
        Name: ENV_CONFIG.QBO_PAID_LABEL,
      });
      const paidDate = paidDateObj ? paidDateObj.StringValue : null;

      const projectNameObj = _.find(payload.item.CustomField, {
        Name: ENV_CONFIG.QBO_PROJECT_NAME_LABEL,
      });
      const projectName = projectNameObj ? projectNameObj.StringValue : null;

      let notes;
      let metadata = {};
      if (payload.item.CustomerMemo) {
        const memo = payload.item.CustomerMemo.value;
        const curlyBracesRegEx = / *\{[^]*\} */g;
        notes = memo.replace(curlyBracesRegEx, '');

        metadata = memo.match(curlyBracesRegEx) ? JSON.parse(memo.match(curlyBracesRegEx)[0]) : {};
      }

      const discountObj = _.find(payload.item.Line, {
        DetailType: 'DiscountLineDetail',
      });
      const discount = discountObj ? discountObj.Amount : 0;

      // Create item object and dispatch
      const item = {
        type,
        id: payload.item.Id,
        createdDate: payload.item.MetaData.CreateTime,
        dueDate: payload.item.DueDate,
        number: payload.item.DocNumber,
        subtotal: _.find(payload.item.Line, {
          DetailType: 'SubTotalLineDetail',
        }).Amount || 0,
        discount,
        taxes: payload.item.TxnTaxDetail.TotalTax || 0,
        taxPercent: payload.item.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent || 0,
        amount: payload.item.TotalAmt || 0,
        deposit: payload.item.Deposit || 0,
        balance: payload.item.Balance || 0,
        email,
        currency: payload.item.CurrencyRef.value || '',
        paid: paidDate || (payload.item.Balance <= 0),
        paidDate,
        projectName,
        items: payload.item.Line || [],
        notes,
        metadata,
        customFields: payload.item.CustomField || [],
        // additional fields specifically for estimates
        status: payload.item.TxnStatus || '',
        expirationDate: payload.item.ExpirationDate || '',
      };

      const { customer } = payload;

      resolve({
        item,
        customer,
      });
    })
    .catch((error) => {
      console.error(error);
      resolve({ error: error.response.data.message });
    });
});

export default getItem;
