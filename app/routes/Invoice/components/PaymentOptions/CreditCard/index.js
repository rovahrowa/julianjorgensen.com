import React from 'react';
import Script from 'react-load-script'

import { StripeProvider } from 'react-stripe-elements';
import { Elements } from 'react-stripe-elements';

import Form from './Form';
import styles from './index.css';

export default class CreditCard extends React.Component {
  state = {
    stripeLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({ stripeLoaded: true })
  }

  render() {
    let { invoice, customer } = this.props;
    let { stripeLoaded } = this.state;

    return (
      <div>
        {stripeLoaded ?
          <StripeProvider apiKey={ENV_CONFIG.STRIPE_PUBLISHABLE_KEY}>
            <Elements>
              <Form invoice={invoice} customer={customer} />
            </Elements>
          </StripeProvider> : ''
        }

        <Script
          url="https://js.stripe.com/v3/"
          onLoad={this.handleScriptLoad}
        />
      </div>
    )
  }
}
