import React from 'react';
import { Link } from 'react-router-dom';
import { getInvoice } from './utils/invoice';

import LoadingSpinner from 'components/LoadingSpinner';
import InvoiceDetails from './components/InvoiceDetails';
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
        customer,
        paid: invoice.paid || false
      });
    });
  }

  markAsPaid = () => {
    this.setState({paid: true});
  }

  render() {
    let { invoice, customer, paid } = this.state;

    if (!invoice) {
      return (
        <div className={styles.container}>
          <LoadingSpinner />
        </div>
      )
    }

    let { number, amount } = invoice;

    return (
      <div className={styles.container}>
        <InvoiceDetails
          invoice={invoice}
          customer={customer}
          paid={paid}
        />
        <PaymentOptions
          invoice={invoice}
          customer={customer}
          paid={paid}
          markAsPaid={this.markAsPaid}
        />
      </div>
    )
  }
}
