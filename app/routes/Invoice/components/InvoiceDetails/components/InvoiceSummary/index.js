import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';

import styles from './index.css';

export default class InvoiceSummary extends React.Component {
  render() {
    let { invoice, customer, paid } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>Subtotal</div>
          <div className={styles.col}>{numeral(invoice.subtotal).format('$0,0.00')}</div>
        </div>

        {invoice.discount > 0 ?
          <div className={styles.row}>
            <div className={styles.col}>Discount</div>
            <div className={styles.col}>-{numeral(invoice.discount).format('$0,0.00')}</div>
          </div>
        : '' }

        <div className={styles.row}>
          <div className={styles.col}>Taxes ({invoice.taxPercent}%)</div>
          <div className={styles.col}>{numeral(invoice.taxes).format('$0,0.00')}</div>
        </div>

        <div className={styles.row}>
          <div className={styles.col}>Total</div>
          <div className={styles.col}>{numeral(invoice.amount).format('$0,0.00')}</div>
        </div>

        {invoice.deposit > 0 ?
          <div className={styles.row}>
            <div className={styles.col}>Deposit</div>
            <div className={styles.col}>{numeral(invoice.deposit).format('$0,0.00')}</div>
          </div>
        : ''}

        <div className={styles.row}>
          <div className={styles.col}><strong>Balance due</strong></div>
          <div className={styles.col}><strong>{numeral(invoice.balance).format('$0,0.00')}</strong></div>
        </div>
      </div>
    )
  }
}
