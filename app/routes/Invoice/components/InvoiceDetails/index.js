import React from 'react';
import moment from 'moment-timezone';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

import InvoiceHeader from './components/InvoiceHeader';
import InvoiceItems from './components/InvoiceItems';
import InvoiceSummary from './components/InvoiceSummary';
import InvoiceCtas from './components/InvoiceCtas';
import TimeEntryDetails from './components/TimeEntryDetails';
import styles from './index.css';

export default class InvoiceDetails extends React.Component {
  render() {
    let { invoice, customer, paid } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.id}><label>Invoice</label>{invoice.id}</div>

        <div className={styles.body}>
          <div className={styles.status}>
            {paid ? `Thank you for your payment on ${moment(invoice.paidDate, 'DD-MM-YYYY').format('MMMM Do YYYY')}` : `${numeral(invoice.balance).format('$0,0.00')} is due on ${moment(invoice.dueDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}`}
          </div>

          <div className={styles.note}>&nbsp;</div>

          <div className={styles.container}>
            <InvoiceHeader {...this.props} />
            <InvoiceItems {...this.props} />

            <div className={styles.summary}>
              <TimeEntryDetails invoice={invoice} />
              <InvoiceSummary {...this.props} />
            </div>

            <footer className={styles.footer}>
              <div className={styles.col}>
                <label>Notes</label>
                <div className={styles.description}>
                  {invoice.notes}
                </div>
              </div>

              <div className={styles.col}>
                <label>Late Fees</label>
                <div className={styles.description}>
                  If this invoice is unpaid by {moment(invoice.dueDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}, a non-compounding late fee of 3.0% accrues monthly on the outstanding amount.
                </div>
              </div>
            </footer>
          </div>

          <InvoiceCtas {...this.props} />
        </div>
      </div>
    )
  }
}