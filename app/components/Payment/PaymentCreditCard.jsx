import React from 'react';
let {connect} = require('react-redux');
let invoiceActions = require('invoiceActions');
import Script from 'react-load-script'
import axios from 'axios';

import {Button} from 'react-toolbox/lib/button';

import styles from './Stripe.css';

class PaymentCreditCard extends React.Component {
  constructor() {
    super();

    this.state = {
      stripeLoading: true,
      stripeLoadingError: false,
      submittingPayment: false,
      paymentError: null,
      paymentComplete: false,
      token: null
    };

    let stripe;
    let card;
  }

  handleScriptError() {
    this.setState({ stripeLoadingError: true })
  }

  createStripeElements() {
    this.setState({
      stripeLoading: false,
      stripeLoadingError: false
    });

    this.stripe = Stripe(ENV_CONFIG.STRIPE_PUBLISHABLE_KEY);
    let elements = this.stripe.elements();


    // Custom styling can be passed to options when creating an Element.
    // (Note that this demo uses a wider set of styles than the guide below.)
    var style = {
      base: {
        color: '#000000',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element
    this.card = elements.create('card', {style: style});
    let card = this.card;

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', ({error}) => {
      if (error) {
        this.setState({
          paymentError: error.message
        });
      } else {
        this.setState({
          paymentError: null
        });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      submittingPayment: true
    });

    let card = this.card;

    this.stripe.createToken(card).then((result) => {
      if (result.error) {
        // Inform the user if there was an error
        this.setState({
          paymentError: result.error.message,
          submittingPayment: false
        });
      } else {
        // Send the token to your server
        this.stripeTokenHandler(result.token);
      }
    });
  }

  // we have the token, now submit the
  // form to the server for the actual charge
  stripeTokenHandler(token) {
    let {email, totalAmount, currency, invoiceId} = this.props.invoice;

    // Submit the form
    axios.post('/api/charge', {
      email,
      invoiceId,
      currency,
      totalAmount,
      stripeToken: token.id
    })
    .then((response) => {
      if (response.status === 200){
        // this.props.markAsPaid();
        this.setState({
          submittingPayment: false
        });
      }
    })
    .catch((error) => {
      console.log('Error using /api/charge: ', error);
    });
  }

  render() {
    let {paid, number, totalAmount} = this.props.invoice;

    return (
      <div>
        <Script
          url="https://js.stripe.com/v3/"
          onError={this.handleScriptError.bind(this)}
          onLoad={this.createStripeElements.bind(this)}
        />
        <h3>Invoice #{number}</h3>
        <form onSubmit={this.handleSubmit.bind(this)} className={styles.form}>
          <div class="form-row">
            <label for="card-element">Credit or debit card</label>
            <div id="card-element" className={styles.StripeElement}></div>

            <div id="card-errors"></div>
          </div>

          <Button label={`Pay ${totalAmount}`} disabled={this.state.submittingPayment} />
        </form>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      invoice: state.invoice
    }
  }
)(PaymentCreditCard);
