import React from 'react';
import moment from 'moment-timezone';
import styles from './index.css';

const InvoiceHeader = ({ invoice, customer, paid }) => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <label>From</label>
          <address>
            <strong>FLO INC.</strong><br />
            Julian Jorgensen<br />
            308 5th Ave E<br />
            V5T 1H4, Vancouver <br />
            B.C., Canada<br /><br />

            me@julianjorgensen.com
          </address>
        </div>
        <div className={styles.col}>
          <label>To</label>
          <address>
            <strong>{customer.FullyQualifiedName}</strong><br />
            {customer.GivenName} {customer.FamilyName || ''}<br />
            {customer.BillAddr.Line1}<br />
            {customer.BillAddr.PostalCode}, {customer.BillAddr.City}<br />
            {customer.BillAddr.CountrySubDivisionCode}, {customer.BillAddr.Country}<br /><br />

            {invoice.email}
          </address>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <label>Issued on</label>
          <date>{moment(invoice.createdDate, 'YYYY-MM-DDTHH:mm:ssZ').format('MMMM Do YYYY')}</date>
        </div>
        <div className={styles.col}>
          <label>Due on</label>
          <date>{moment(invoice.dueDate, 'YYYY-MM-DD').format('MMMM Do YYYY')}</date>
        </div>
      </div>
    </div>
  )
};

export default InvoiceHeader;
