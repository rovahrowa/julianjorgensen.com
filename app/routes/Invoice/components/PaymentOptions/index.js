import React from 'react';
import { Link } from 'react-router-dom';

import CreditCard from './CreditCard';
import BankTransfer from './BankTransfer';
import PayPal from './PayPal';
import Cheque from './Cheque';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import styles from './index.css';

export default class PaymentOptions extends React.Component {
  state = {
    fixedIndex: 0,
    paid: false
  };

  handleFixedTabChange = (index) => {
    this.setState({fixedIndex: index});
  };


  render() {
    let { invoice, customer, paid, markAsPaid } = this.props;

    if (paid) {
      return (
        <div className={styles.container}>
          <div className={styles.paymentThankYou}>
            <h2>Thank you for your payment!</h2>
          </div>
        </div>
      )
    }

    return (
      <div className={styles.container}>
        <Tabs index={this.state.fixedIndex} theme={styles} onChange={this.handleFixedTabChange} fixed>
          <Tab label='Credit Card'>
            <CreditCard
              invoice={invoice}
              customer={customer}
              markAsPaid={this.markAsPaid}
            />
          </Tab>
          <Tab label='Bank Transfer'>
            <BankTransfer />
          </Tab>
          <Tab label='PayPal'>
            <PayPal
              invoice={invoice}
              customer={customer}
              markAsPaid={markAsPaid}
            />
          </Tab>
          <Tab label='Cheque'>
            <Cheque />
          </Tab>
        </Tabs>
      </div>
    )
  }
}
