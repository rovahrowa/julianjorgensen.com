import React from 'react';
import Script from 'react-load-script'

import { StripeProvider } from 'react-stripe-elements';
import { Elements } from 'react-stripe-elements';

import Form from './Form';
import styles from './index.css';

let ScandiaWebRegular = require('assets/fonts/ScandiaWebRegular.woff2');

export default class CreditCard extends React.Component {
  state = {
    stripeLoaded: false
  }

  handleScriptLoad = () => {
    this.setState({ stripeLoaded: true })
  }

  render() {
    let { stripeLoaded } = this.state;

    return (
      <div className={styles.container}>
        {stripeLoaded ?
          <StripeProvider apiKey={ENV_CONFIG.STRIPE_PUBLISHABLE_KEY}>
            <Elements fonts={[{
              family: 'ScandiaWeb-Regular',
              src: `url(${ScandiaWebRegular})`
            }]}>
              <Form {...this.props} />
            </Elements>
          </StripeProvider> : ''
        }

        {/* load stripe api */}
        <Script
          url="https://js.stripe.com/v3/"
          onLoad={this.handleScriptLoad}
        />
      </div>
    )
  }
}
