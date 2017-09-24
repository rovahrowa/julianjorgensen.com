import React from 'react';
import moment from 'moment';
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
      item,
      customer,
      paid
    } = this.props;

    let renderStatus = () => {
      if (paid) {
        return `Thank you for your payment ${item.paidDate ? `on ${moment(item.paidDate, 'DD-MM-YYYY').format('MMMM Do YYYY')}` : ''}`;
       } else {
        return `${numeral(item.balance).format('$0,0.00')} is due on ${moment(item.dueDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}`;
       }
    };

    return (
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.id}><label>Invoice</label>{item.number}</div>

        <div className={sharedStyles.body}>
          <div className={sharedStyles.status}>
            {renderStatus()}
          </div>

          <div className={sharedStyles.note}>&nbsp;</div>

          <div className={sharedStyles.container}>
            <Header {...this.props} />
            <Items {...this.props} />

            <div className={sharedStyles.summary}>
              <TimeEntryDetails item={item} />
              <Summary {...this.props} />
            </div>

            <footer className={sharedStyles.footer}>
              <div className={sharedStyles.col}>
                <label>Notes</label>
                <div className={sharedStyles.description}>
                  {item.notes}
                </div>
              </div>

              <div className={sharedStyles.col}>
                <label>Late Fees</label>
                <div className={sharedStyles.description}>
                  If this invoice is unpaid by {moment(item.dueDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}, a non-compounding late fee of 3.0% accrues monthly on the outstanding amount.
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
