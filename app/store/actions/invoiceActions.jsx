import axios from 'axios';
import _ from 'lodash';
import numeral from 'numeral';

// Set the current invoice
export function setInvoice(invoiceId, invoiceToken) {
  return (dispatch, getState) => {
    console.log('initiating fetching invoice data from api');
    axios.get('/api/invoice/' + invoiceId + '?token=' + invoiceToken)
      .then((response) => {
        let payload = response.data;

        // if invoice has a email then use that, otherwise use the email(s) associated with the customer
        let email;
        if (payload.BillEmail){
          email = payload.BillEmail.Address
        }else if (payload.PrimaryEmailAddr){
          email = payload.PrimaryEmailAddr.Address
        }else{
          email = null;
        }

        console.log(payload);
        let paidDate = _.find(payload, { 'CustomField': {'Name': 'paid date'}});
        console.log('paidDate: ', paidDate);

        // Create invoice object and dispatch
        let invoice = {
          id: payload.Id,
          number: payload.DocNumber,
          totalAmount: numeral(payload.TotalAmt).format('$0,0.00'),
          email: email,
          currency: payload.CurrencyRef.value,
          paid: (payload.CustomField[0].StringValue ? true : false)
        };
        console.log('dispatching invoice: ', invoice);
        dispatch({ type: 'SET_INVOICE', invoice });
      })
      .catch((error) => {
        console.log('Error getting invoice data from api...', error);
      });
  }
}

export default {
  set: setInvoice
}
