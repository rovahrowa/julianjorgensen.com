import React from 'react';
import {Link} from 'react-router-dom';
let {connect} = require('react-redux');
let invoiceActions = require('invoiceActions');
import numeral from 'numeral';

import Loader from 'Loader';
import PaymentOptions from 'Payment/PaymentOptions';
import styles from './Invoice.css';

class Invoice extends React.Component {
  constructor() {
    super();

    let dispatch;
  }

  componentWillMount() {
    this.dispatch = this.props.dispatch;

    // Retrieve invoice data
    let invoiceId = this.props.params.id;
    let invoiceToken = this.props.location.query.token;
    this.dispatch(invoiceActions.setInvoice(invoiceId, invoiceToken));
  }

  render() {
    let {paid, number, totalAmount} = this.props.invoice;

    let paymentOptions = () => {
      if (paid){
        return <div>Payment Received. Thank you!</div>
      }else{
        return (
          <PaymentOptions />
        )
      }
    }

    if (number){
      return (
        <div className={styles.container}>
          {/* <div className="callout alert">There was an error. Please contact me if it persists: <a href="mailto:me@julianjorgensen.com">me@julianjorgensen.com</a></div> */}
          <h1>Invoice total amount: { totalAmount }</h1>
          {paymentOptions()}
        </div>
      )
    }else{
      return (
        <Loader />
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      invoice: state.invoice
    }
  }
)(Invoice);
