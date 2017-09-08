import React from 'react';
import moment from 'moment-timezone';
import styles from './index.css';

const InvoiceHeader = ({ invoice, customer, paid }) => {
  let renderAddress = () => {
    if (!customer.BillAddr) {
      return (<div></div>)
    }

    return (
      <address className={styles.address}>
        {customer.BillAddr.Line1 ? <div className={styles.line1}>{customer.BillAddr.Line1}</div> : ''}
        {customer.BillAddr.PostalCode ? <div className={styles.postalCode}>{customer.BillAddr.PostalCode}</div> : ''}
        {customer.BillAddr.City ? <div className={styles.city}>{customer.BillAddr.City}</div> : ''}
        {customer.BillAddr.CountrySubDivisionCode ? <div className={styles.province}>{customer.BillAddr.CountrySubDivisionCode}</div> : ''}
        {customer.BillAddr.Country ? <div className={styles.country}>{customer.BillAddr.Country}</div> : ''}
      </address>
    )
  };

  return (
    <div className={styles.container}>

      {paid ? <div className={styles.paid}>Paid</div> : ''}

      <div className={styles.row}>
        <div className={styles.col}>
          <label>From</label>
          <address>
            <strong>FLO INC.</strong><br />
            Julian Jorgensen<br />
            308 5th Ave E<br />
            V5T 1H4, Vancouver <br />
            B.C., Canada

            <div className={styles.email}>me@julianjorgensen.com</div>
          </address>
        </div>
        <div className={styles.col}>
          <label>To</label>
          <address>
            <strong>{customer.FullyQualifiedName}</strong><br />
            {customer.GivenName || ''} {customer.FamilyName || ''}
            {renderAddress()}
            <div className={styles.email}>{invoice.email}</div>
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
