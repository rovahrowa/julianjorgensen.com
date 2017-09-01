import React from 'react';
import { Link } from 'react-router-dom';

import CreditCard from './CreditCard';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import styles from './index.css';

export default class PaymentOptions extends React.Component {
  constructor() {
    super();

    this.state = {
      fixedIndex: 0
    };

    let dispatch;
  }

  handleFixedTabChange = (index) => {
    this.setState({fixedIndex: index});
  };

  handleActive = () => {
    console.log('Special one activated');
  };

  render() {
    let { invoice, customer } = this.props;

    return (
      <div className={styles.container}>
        <Tabs index={this.state.fixedIndex} theme={styles} onChange={this.handleFixedTabChange} fixed>
          <Tab label='Credit Card'>
            <CreditCard invoice={invoice} customer={customer} />
          </Tab>
          <Tab label='Bank Transfer'>
            <small>Second Content</small>
          </Tab>
          <Tab label='PayPal'>
            <small>Third Content</small>
          </Tab>
        </Tabs>
      </div>
    )
  }
}
