import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { invoiceActions } from 'actions';
import axios from 'axios';

import PaymentCreditCard from 'components/Payment/PaymentCreditCard';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import styles from './index.css';

@connect(
  ({ invoice }) => ({
    invoice: invoice
  })
)
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
    let {paid, invoiceNumber, totalAmount} = this.props.invoice;

    return (
      <div className={styles.container}>
        <Tabs index={this.state.fixedIndex} onChange={this.handleFixedTabChange} fixed>
          <Tab label='Credit Card'><PaymentCreditCard /></Tab>
          <Tab label='Bank Transfer'><small>Second Content</small></Tab>
          <Tab label='PayPal'><small>Third Content</small></Tab>
        </Tabs>
      </div>
    )
  }
}
