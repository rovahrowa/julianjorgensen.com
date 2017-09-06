import axios from 'axios';
import _ from 'lodash';
import numeral from 'numeral';

// Get invoice details from QuickBooks
export function getInvoice(invoiceId, invoiceToken) {
  return new Promise((resolve, reject) => {
    console.log('initiating fetching invoice data from api');
    axios.get('/api/invoice/' + invoiceId + '?token=' + invoiceToken)
      .then((response) => {
        let payload = response.data;

        console.log('response from invoice api', response);

        // if invoice has a email then use that, otherwise use the email(s) associated with the customer
        let email;
        if (payload.invoice.BillEmail) {
          email = payload.invoice.BillEmail.Address
        }else if (payload.customer.PrimaryEmailAddr){
          email = payload.customer.PrimaryEmailAddr.Address
        }else{
          email = null;
        }

        let paidDateObj = _.find(payload.invoice.CustomField, {'Name': 'paid date'});
        let paidDate = paidDateObj ? paidDateObj.StringValue : null;

        let dateRangeObj = _.find(payload.invoice.CustomField, {'Name': 'date range'});
        let dateRange = dateRangeObj ? dateRangeObj.StringValue ? dateRangeObj.StringValue.split(' - ') : null : null;

        // Create invoice object and dispatch
        let invoice = {
          id: payload.invoice.Id,
          createdDate: payload.invoice.MetaData.CreateTime,
          dueDate: payload.invoice.DueDate,
          number: payload.invoice.DocNumber,
          subtotal: _.find(payload.invoice.Line, {'DetailType': 'SubTotalLineDetail'}).Amount || 0,
          discount: _.find(payload.invoice.Line, {'DetailType': 'DiscountLineDetail'}).Amount || 0,
          taxes: payload.invoice.TxnTaxDetail.TotalTax || 0,
          taxPercent: payload.invoice.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent || 0,
          amount: payload.invoice.TotalAmt || 0,
          deposit: payload.invoice.Deposit || 0,
          balance: payload.invoice.Balance || 0,
          email: email,
          currency: payload.invoice.CurrencyRef.value || '',
          paid: paidDate && payload.invoice.Balance <= 0 ? true : false,
          paidDate: paidDate,
          dateRange: dateRange,
          items: payload.invoice.Line || [],
          notes: payload.invoice.CustomerMemo.value || '',
          customFields: payload.invoice.CustomField || []
        };
        console.log('invoice: ', invoice);

        let customer = payload.customer;

        console.log('customer: ', customer);

        resolve({invoice, customer});
      })
      .catch((error) => {
        reject(`Error getting invoice data from api...${error}`);
      });
  });
}
