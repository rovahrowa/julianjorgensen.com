import axios from 'axios';
import _ from 'lodash';
import numeral from 'numeral';

// Get item details from QuickBooks
export function getItem(type, id, token) {
  return new Promise((resolve, reject) => {

    axios.get(`/api/qbo/item/${type}/${id}?token=${token}`)
      .then((response) => {
        let payload = response.data;

        console.log('response from qbo item api', response);

        // if item has a email then use that, otherwise use the email(s) associated with the customer
        let email;
        if (payload.item.BillEmail) {
          email = payload.item.BillEmail.Address
        } else if (payload.customer.PrimaryEmailAddr) {
          email = payload.customer.PrimaryEmailAddr.Address
        } else {
          email = null;
        }

        let paidDateObj = _.find(payload.item.CustomField, {
          'Name': ENV_CONFIG.QBO_PAID_LABEL
        });
        let paidDate = paidDateObj ? paidDateObj.StringValue : null;

        let dateRangeObj = _.find(payload.item.CustomField, {
          'Name': ENV_CONFIG.QBO_DATE_RANGE_LABEL
        });
        let dateRange = dateRangeObj ? dateRangeObj.StringValue ? dateRangeObj.StringValue.split(' - ') : null : null;

        let notes;
        let report;
        if (payload.item.CustomerMemo) {
          let memo = payload.item.CustomerMemo.value;
          notes = memo.split('metadata')[0] || '';
          report = memo.split('metadata')[1] ? memo.split('metadata')[1].split('report=')[1] : '';
        }

        let discountObj = _.find(payload.item.Line, {
          'DetailType': 'DiscountLineDetail'
        });
        let discount = discountObj ? discountObj.Amount : 0;

        // Create item object and dispatch
        let item = {
          type: type,
          id: payload.item.Id,
          createdDate: payload.item.MetaData.CreateTime,
          dueDate: payload.item.DueDate,
          number: payload.item.DocNumber,
          subtotal: _.find(payload.item.Line, {
            'DetailType': 'SubTotalLineDetail'
          }).Amount || 0,
          discount: discount,
          taxes: payload.item.TxnTaxDetail.TotalTax || 0,
          taxPercent: payload.item.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent || 0,
          amount: payload.item.TotalAmt || 0,
          deposit: payload.item.Deposit || 0,
          balance: payload.item.Balance || 0,
          email: email,
          currency: payload.item.CurrencyRef.value || '',
          paid: paidDate ? true : false,
          paidDate: paidDate,
          dateRange: dateRange,
          items: payload.item.Line || [],
          notes: notes,
          report: report,
          customFields: payload.item.CustomField || [],
          // additional fields specifically for estimates
          status: payload.item.TxnStatus || '',
          expirationDate: payload.item.ExpirationDate || ''
        };
        console.log('item: ', item);

        let customer = payload.customer;

        console.log('customer: ', customer);

        resolve({
          item,
          customer
        });
      })
      .catch((error) => {
        reject(`Error getting quickbooks item data from api...${error}`);
      });
  });
}
