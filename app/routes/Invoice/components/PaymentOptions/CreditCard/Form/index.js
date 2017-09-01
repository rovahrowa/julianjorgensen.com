import React from 'react';
import axios from 'axios';

import { injectStripe, CardElement } from 'react-stripe-elements';
import { Button } from 'react-toolbox/lib/button';

import styles from './index.css';

@injectStripe
export default class CreditCardForm extends React.Component {
  handleSubmit = (ev) => {
    ev.preventDefault();

    let { invoice, customer } = this.props;

    this.props.stripe.createToken({
      name: customer.FullyQualifiedName
    }).then(({token}) => {
      console.log('Received Stripe token:', token);

      // Submit the form
      axios.post('/api/charge', {
        invoiceId: invoice.id,
        email: invoice.email,
        currency: invoice.currency,
        amount: invoice.amount,
        stripeToken: token.id
      })
      .then((response) => {
        if (response.status === 200) {
          // this.props.markAsPaid();
          this.setState({
            submittingPayment: false
          });
        }
      })
      .catch((error) => {
        console.log('Error using /api/charge: ', error);
      });
    });
  }

  render() {
    let { paid, number, amount, amountFormatted } = this.props.invoice;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <label>
          Card details
          <CardElement style={{base: {fontSize: '18px'}}} />
        </label>
        <button>Confirm order {amountFormatted}</button>
      </form>
    )
  }
}
