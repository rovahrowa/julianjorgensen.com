import React from 'react';
import { Link } from 'react-router-dom';
import { getInvoice } from './utils/invoice';

import LoadingSpinner from 'components/LoadingSpinner';
import PaymentOptions from './components/PaymentOptions';
import styles from './index.css';

export default class Invoice extends React.Component {
  state = {
    invoice: null
  }

  componentWillMount() {
    // Retrieve invoice data
    let invoiceId = this.props.match.params.id;
    let invoiceToken = this.props.match.params.token;

    getInvoice(invoiceId, invoiceToken).then(({ invoice, customer }) => {
      this.setState({
        invoice,
        customer
      });
    });
  }

  render() {
    let { invoice, customer } = this.state;

    if (!invoice) {
      return (
        <div className={styles.container}>
          <LoadingSpinner />
        </div>
      )
    }

    let { paid, number, amount } = invoice;

    if (paid) {
      return <div>Payment Received. Thank you!</div>
    }

    return (
      <div className={styles.container}>
        {/* <div className="callout alert">There was an error. Please contact me if it persists: <a href="mailto:me@julianjorgensen.com">me@julianjorgensen.com</a></div> */}
        <PaymentOptions invoice={invoice} customer={customer} />
      </div>
    )
  }
}
