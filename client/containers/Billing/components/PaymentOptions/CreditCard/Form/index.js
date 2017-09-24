import React from 'react';
import numeral from 'numeral';
import axios from 'axios';

import { injectStripe, CardElement } from 'react-stripe-elements';

import Button from 'components/Button';
import styles from './index.css';

import AlertIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/exclamation-circle.svg';

@injectStripe
export default class CreditCardForm extends React.Component {
  state = {
    submitting: false,
    error: false,
    name: '',
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value});
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    this.setState({
      submitting: true,
      error: false
    });

    let { item, customer } = this.props;
    let { name } = this.state;

    this.props.stripe.createToken({
      name
    }).then(({error, token}) => {
      if(error) {
        this.setState({
          submitting: false,
          error: error.message
        });
        return false;
      }

      this.createCharge(token);
    });
  }

  createCharge = (token) => {
    let { item, customer } = this.props;

    axios.post('/api/stripe/charge', {
      invoiceId: item.id,
      invoiceNumber: item.number,
      email: item.email,
      currency: item.currency,
      amount: item.balance,
      stripeToken: token.id
    })
    .then((response) => {
      console.log('response from stripe charge', response);

      if (response.data.error) {
        this.setState({
          submitting: false,
          error: response.data.error
        });
        return false;
      }

      // charged successful
      this.setState({
        submitting: false,
        error: false
      });
      this.props.markAsPaid();
    })
    .catch((error) => {
      console.log('error', error);
      this.setState({
        submitting: false,
        error: `There was a technical error. Please contact me@julianjorgensen.com if the issue persists... Error details: ${error}`
      });
    });
  }

  render() {
    let { error } = this.state;
    let { customer, item } = this.props;

    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.cardHolderName}>
            <input
              type='text'
              className={styles.input}
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder='Cardholder name'
              disabled={this.state.submitting}
              required
            />
          </div>

          <div className={styles.card}>
            <CardElement
              className={styles.input}
              style={
                {
                  base: {
                    fontSize: '18px',
                    fontFamily: 'ScandiaWeb-Regular',
                    color: this.state.submitting ? '#C0C0C0' : '#000000'
                  }
                }}
            />
          </div>

          <Button
            type='submit'
            disabled={this.state.submitting}
            primary
            className={styles.submit}
          >
            Pay {item.currency} {numeral(item.balance).format('$0,0.00')}
          </Button>
          <small className={styles.securityNote}>Protected by bank-level security using Stripe.</small>

          {error ?
            <div className={styles.error}>
              <AlertIcon className={styles.icon} /> Error: {error}
            </div>
          : ''}
        </form>
      </div>
    )
  }
}
