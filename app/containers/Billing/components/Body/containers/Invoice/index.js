import React from 'react';
import moment from 'moment-timezone';
import numeral from 'numeral';
import {
  Link
} from 'react-router-dom';

import Header from '../../components/Header';
import Items from '../../components/Items';
import Summary from '../../components/Summary';
import InvoiceCtas from '../../components/InvoiceCtas';
import TimeEntryDetails from '../../components/TimeEntryDetails';
import sharedStyles from '../../index.css';
import styles from './index.css';

export default class InvoiceBody extends React.Component {
  render() {
    let {
      invoice,
      customer,
      paid
    } = this.props;

    return (
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.id}><label>Invoice</label>{invoice.number}</div>

        <div className={sharedStyles.body}>
          <div className={sharedStyles.status}>
            {paid ? `Thank you for your payment on ${moment(invoice.paidDate, 'DD-MM-YYYY').format('MMMM Do YYYY')}` : `${numeral(invoice.balance).format('$0,0.00')} is due on ${moment(invoice.dueDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}`}
          </div>

          <div className={sharedStyles.note}>&nbsp;</div>

          <div className={sharedStyles.container}>
            <Header {...this.props} />
            <Items {...this.props} />

            <div className={sharedStyles.summary}>
              <TimeEntryDetails invoice={invoice} />
              <Summary {...this.props} />
            </div>

            <footer className={sharedStyles.footer}>
              <div className={sharedStyles.col}>
                <label>Notes</label>
                <div className={sharedStyles.description}>
                  {invoice.notes}
                </div>
              </div>

              <div className={sharedStyles.col}>
                <label>Late Fees</label>
                <div className={sharedStyles.description}>
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
