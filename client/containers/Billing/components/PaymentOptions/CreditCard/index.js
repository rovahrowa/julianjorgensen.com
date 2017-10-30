import React, { Component } from 'react';
import Script from 'react-load-script';
import { StripeProvider, Elements } from 'react-stripe-elements';
import ScandiaWebRegular from 'assets/fonts/ScandiaWebRegular.woff2';
import Form from './Form';
import styles from './index.css';

export default class CreditCard extends Component {
  state = {
    stripeLoaded: false,
  }

  handleScriptLoad = () => {
    this.setState({ stripeLoaded: true });
  }

  render() {
    const { stripeLoaded } = this.state;

    return (
      <div className={styles.container}>
        {stripeLoaded ?
          <StripeProvider apiKey={ENV_CONFIG.STRIPE_PUBLISHABLE_KEY}>
            <Elements fonts={[{
              family: 'ScandiaWeb-Regular',
              src: `url(${ScandiaWebRegular})`,
            }]}
            >
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
    );
  }
}
