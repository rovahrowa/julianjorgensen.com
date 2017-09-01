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
        if (payload.invoice.BillEmail){
          email = payload.invoice.BillEmail.Address
        }else if (payload.customer.PrimaryEmailAddr){
          email = payload.customer.PrimaryEmailAddr.Address
        }else{
          email = null;
        }

        let paidDateObj = _.find(payload.invoice.CustomField, {'Name': 'paid date'});
        let paidDate = paidDateObj ? paidDateObj.StringValue : null;

        // Create invoice object and dispatch
        let invoice = {
          id: payload.invoice.Id,
          number: payload.invoice.DocNumber,
          amountFormatted: numeral(payload.invoice.TotalAmt).format('$0,0.00'),
          amount: payload.invoice.TotalAmt,
          email: email,
          currency: payload.invoice.CurrencyRef.value,
          paid: paidDate ? true : false
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
