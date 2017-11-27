import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';
import Header from '../../components/Header';
import Items from '../../components/Items';
import Summary from '../../components/Summary';
import InvoiceCtas from '../../components/InvoiceCtas';
import TimeEntryDetails from '../../components/TimeEntryDetails';
import sharedStyles from '../../index.css';

export default class InvoiceBody extends Component {
  render() {
    const {
      item,
      paid,
    } = this.props;

    const renderStatus = () => {
      if (paid) {
        return `Thank you for your payment ${item.paidDate ? `on ${moment(item.paidDate, 'DD-MM-YYYY').format('MMMM Do YYYY')}` : ''}`;
      }

      const dueDate = moment(item.dueDate, 'YYYY-MM-DD');
      const wasIs = moment().diff(dueDate) < 0 ? 'is' : 'was';
      return `${numeral(item.balance).format('$0,0.00')} ${wasIs} due on ${dueDate.format('MMMM Do YYYY')}`;
    };

    return (
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.id}><label>Invoice</label>{item.number}</div>

        <div className={sharedStyles.body}>
          <div className={sharedStyles.status}>
            {renderStatus()}
          </div>

          <div className={sharedStyles.note}>&nbsp;</div>

          <Header {...this.props} />
          
          <div className={sharedStyles.container}>
            <Items {...this.props} />

            <div className={sharedStyles.summary}>
              <TimeEntryDetails item={item} />
              <Summary {...this.props} />
            </div>
          </div>
  
          <footer className={sharedStyles.notes}>
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

          <InvoiceCtas {...this.props} />
        </div>
      </div>
    )
  }
}
