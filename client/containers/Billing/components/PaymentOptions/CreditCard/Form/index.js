import React, { Component } from 'react';
import numeral from 'numeral';
import axios from 'axios';
import { injectStripe, CardElement } from 'react-stripe-elements';
import Button from 'components/Button';
import AlertIcon from 'assets/icons/FontAwesome/regular/exclamation-circle.svg';
import styles from './index.css';

@injectStripe
export default class CreditCardForm extends Component {
  state = {
    submitting: false,
    error: false,
    name: '',
  }

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = (ev) => {
    ev.preventDefault();

    this.setState({
      submitting: true,
      error: false,
    });

    const { name } = this.state;

    this.props.stripe.createToken({
      name,
    }).then(({ error, token }) => {
      if (error) {
        this.setState({
          submitting: false,
          error: error.message,
        });
        return false;
      }

      this.createCharge(token);
      return true;
    });
  }

  createCharge = (token) => {
    const { item } = this.props;

    axios.post('/api/stripe/charge', {
      invoiceId: item.id,
      invoiceNumber: item.number,
      email: item.email,
      currency: item.currency,
      amount: item.balance,
      stripeToken: token.id,
    }).then((response) => {
      if (response.data.error) {
        this.setState({
          submitting: false,
          error: response.data.error,
        });
        return false;
      }

      // charged successful
      this.setState({
        submitting: false,
        error: false,
      });
      this.props.markAsPaid();
      return true;
    }).catch((error) => {
      this.setState({
        submitting: false,
        error: `There was a technical error. Please contact me@julianjorgensen.com if the issue persists... Error details: ${error}`
      });
    });
  }

  render() {
    const { error } = this.state;
    const { item } = this.props;

    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <div className={styles.cardHolderName}>
            <input
              type="text"
              className={styles.input}
              value={this.state.name}
              onChange={this.handleNameChange}
              placeholder="Cardholder name"
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
            type="submit"
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
    );
  }
}
