import React from 'react';
import Script from 'react-load-script'
import axios from 'axios';

class PaymentForm extends React.Component {
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

    // Create an instance of the card Element
    this.card = elements.create('card');
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
    let {email, amount, currency, invoiceId} = this.props;

    // Submit the form
    axios.post('/api/charge', {
      email,
      invoiceId,
      currency,
      amount,
      stripeToken: token.id
    })
    .then((response) => {
      if (response.status === 200){
        this.props.markAsPaid();
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
    let {amount} = this.props;

    return (
      <div>
        <Script
          url="https://js.stripe.com/v3/"
          onError={this.handleScriptError.bind(this)}
          onLoad={this.createStripeElements.bind(this)}
        />

        <form onSubmit={this.handleSubmit.bind(this)} id="payment-form">
          <div class="form-row">
            <label for="card-element">Credit or debit card</label>
            <div id="card-element"></div>

            <div id="card-errors"></div>
          </div>

          <button className="button" disabled={this.state.submittingPayment}>Pay ${amount}</button>
        </form>
        <span>{ this.state.paymentComplete ? 'Payment completed' : 'Payment has not been completed' }</span><br />
      </div>
    )
  }
}


module.exports = PaymentForm;
