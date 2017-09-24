import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import {
  Link
} from 'react-router-dom';

import Header from '../../components/Header';
import Items from '../../components/Items';
import Summary from '../../components/Summary';
import EstimateCtas from '../../components/EstimateCtas';
import styles from './index.css';
import sharedStyles from '../../index.css';

export default class EstimateBody extends React.Component {
  render() {
    let {
      item,
      customer,
      paid
    } = this.props;

    return (
      <div className={sharedStyles.wrapper}>
        <div className={sharedStyles.id}><label>Estimate</label>{item.number}</div>

        <div className={sharedStyles.body}>
          <div className={sharedStyles.status}>
            {item.status}
          </div>

          <div className={sharedStyles.container}>
            <Header {...this.props} />
            <Items {...this.props} />

            <div className={styles.summary}>
              <Summary {...this.props} />
            </div>

            <label>Notes</label>
            <div className={sharedStyles.footer}>
              <div className={sharedStyles.col}>
                <div className={sharedStyles.description}>
                  {item.notes}
                </div>
              </div>
            </div>
          </div>

          <div className={sharedStyles.finePrint}>
            <div className={sharedStyles.col}>
              <label>Browser Compatibility</label>
              <div className={sharedStyles.description}>
                All major browsers and their last 2 major releases; Chrome, Safari, Firefox, Edge and Internet Explorer 11+ is supported. While IE 9 and 10 is not specifically supported, they usually look fine anyway. <a href='https://www.w3schools.com/Browsers/default.asp' target='new'>See current browser statistics</a>.
              </div>
            </div>
            <div className={sharedStyles.col}>
              <label>Device Compatibility</label>
              <div className={sharedStyles.description}>
                <p>All common desktop, laptop, tablet, and mobile devices is supported.</p>
                <p>This includes, but not limited to; iMacs, MacBooks, iPhones, PCs, and Androids.</p>
              </div>
            </div>
            <div className={sharedStyles.col}>
              <label>Late Fees</label>
              <div className={sharedStyles.description}>
                For invoices overdue by 1 month or more, a non-compounding late fee of 3.0% accrues monthly on the outstanding amount.
              </div>
            </div>
            <div className={sharedStyles.col}>
              <label>Payment terms</label>
              <div className={sharedStyles.description}>
                <p>50% deposit is required at project start. The remaining 50% is to be paid within 14 days of final signoff (launch).</p>
                <p>I accept Credit Card, Bank Transfer, E-Transfer, PayPal, and Cheque.</p>
              </div>
            </div>
            <div className={sharedStyles.col}>
              <label>Estimate vs Quote</label>
              <div className={sharedStyles.description}>
                <p>An estimate is used to give a rough idea of time and effort. It can vary depending on scope. Once we fully clarify project scope and requirements, I can provide a fixed quote.</p>
              </div>
            </div>

            <div className={sharedStyles.col}>
              <label>Expiration</label>
              <div className={sharedStyles.description}>
                <p>This estimate expires on <date>{moment(item.expirationDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}</date></p>
              </div>
            </div>

            </div>

          <EstimateCtas {...this.props} />
        </div>
      </div>
    )
  }
}
