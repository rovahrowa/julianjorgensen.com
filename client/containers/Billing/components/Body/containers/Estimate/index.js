import React from 'react';
import moment from 'moment';
import Header from '../../components/Header';
import Items from '../../components/Items';
import Summary from '../../components/Summary';
import EstimateCtas from '../../components/EstimateCtas';
import styles from './index.css';
import sharedStyles from '../../index.css';

export default props => (
  <div className={sharedStyles.wrapper}>
    <div className={sharedStyles.id}><label>Estimate</label>{props.item.number}</div>

    <div className={sharedStyles.body}>
      <div className={sharedStyles.status}>
        {props.item.status}
      </div>

      <Header {...props} />
      
      <div className={sharedStyles.container}>
        <Items {...props} />

        <div className={styles.summary}>
          <Summary {...props} />
        </div>
      </div>

      <div className={`${sharedStyles.notes} ${sharedStyles.fullCol}`}>
        <label>Notes</label>
        <div className={sharedStyles.col}>
          <div className={sharedStyles.description}>
            <p>{props.item.notes}</p>
          </div>
        </div>
      </div>

      <div className={sharedStyles.finePrint}>
        <div className={sharedStyles.col}>
          <label>Browser Compatibility</label>
          <div className={sharedStyles.description}>
            <p>All major browsers and their last 2 major releases; Chrome, Safari, Firefox, Edge and Internet Explorer 11+ is supported. While IE 9 and 10 is not specifically supported, they usually look fine anyway. <a href='https://www.w3schools.com/Browsers/default.asp' target='new'>See current browser statistics</a>.</p>
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
            <p>For invoices overdue by 1 month or more, a non-compounding late fee of 3.0% accrues monthly on the outstanding amount.</p>
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
          <label>License/material costs</label>
          <div className={sharedStyles.description}>
            <p>All costs associated with hosting, domains, subscriptions, and other services are not included.</p>
          </div>
        </div>
        <div className={sharedStyles.col}>
          <label>Expiration</label>
          <div className={sharedStyles.description}>
            <p>This estimate expires on <date>{moment(props.item.expirationDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}</date></p>
          </div>
        </div>
      </div>

      <EstimateCtas {...props} />
    </div>
  </div>
);
