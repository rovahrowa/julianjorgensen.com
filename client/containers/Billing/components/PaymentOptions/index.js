import React, { Component } from 'react';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import CreditCard from './CreditCard';
import BankTransfer from './BankTransfer';
import PayPal from './PayPal';
import Cheque from './Cheque';
import styles from './index.css';

export default class PaymentOptions extends Component {
  state = {
    fixedIndex: 0,
  };

  componentDidMount() {
    const { metadata } = this.props.item;
    if (metadata.defaultPayment) {
      this.handleTabChange(metadata.defaultPayment);
    }
  }

  handleTabChange = (index) => {
    this.setState({ fixedIndex: index }, () => {
      // trigger onloaded
      this.props.onLoaded();
    });
  }

  render() {
    const { paid } = this.props;

    if (paid) {
      return (
        <div className={styles.container}>
          <div className={styles.paymentThankYou}>
            <h2>Thank you for your payment!</h2>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.container} id="pay">
        <Tabs index={this.state.fixedIndex} theme={styles} onChange={this.handleTabChange} fixed>
          <Tab label="Credit Card">
            <CreditCard {...this.props} />
          </Tab>
          <Tab label="Bank Transfer">
            <BankTransfer />
          </Tab>
          <Tab label="PayPal">
            <PayPal {...this.props} />
          </Tab>
          <Tab label="Cheque">
            <Cheque />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
