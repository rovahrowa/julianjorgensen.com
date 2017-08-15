import axios from 'axios';
import numeral from 'numeral';

// Set the current invoice
export function setInvoice(invoiceId, invoiceToken) {
  return (dispatch, getState) => {
    console.log('initiating fetching invoice data from api');
    axios.get('/api/invoice/' + invoiceId + '?token=' + invoiceToken)
      .then((response) => {
        // if invoice has a email then use that, otherwise use the email(s) associated with the customer
        let email;
        if (response.data.BillEmail){
          email = response.data.BillEmail.Address
        }else if (response.data.PrimaryEmailAddr){
          email = response.data.PrimaryEmailAddr.Address
        }else{
          email = null;
        }

        console.log(response.data);

        // Create invoice object and dispatch
        let invoice = {
          id: response.data.Id,
          number: response.data.DocNumber,
          totalAmount: numeral(response.data.TotalAmt).format('$0,0.00'),
          email: email,
          currency: response.data.CurrencyRef.value,
          paid: (response.data.CustomField[0].StringValue ? true : false)
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
