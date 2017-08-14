import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import invoiceActions from 'actions';
import numeral from 'numeral';

import Loader from 'components/Loader';
import PaymentOptions from 'components/Payment/PaymentOptions';
import styles from './index.css';

@connect(
  ({ invoice }) => ({
    invoice: invoice
  })
)
export default class Invoice extends React.Component {
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
