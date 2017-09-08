import React from 'react';
import Button from 'components/Button';
import styles from './index.css';

const InvoiceCtas = ({ invoice, customer, paid }) => {
  return (
    <div className={styles.container}>
      <div className={styles.ctas}>
        <Button label='Print invoice' onClick={() => window.print()} />
        <Button href='#pay' primary label='Pay now' />
      </div>
    </div>
  )
};

export default InvoiceCtas;
