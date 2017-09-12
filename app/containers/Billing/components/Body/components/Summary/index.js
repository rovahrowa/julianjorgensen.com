import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';

import styles from './index.css';

export default class BillingSummary extends React.Component {
  render() {
    let {
      item,
      customer,
      paid
    } = this.props;

    let renderBalanceDue = () => {
      if (item.type === 'estimate') return (<div></div>);

      return (
        <div className={styles.row}>
          <div className={styles.col}><strong>Balance due</strong></div>
          <div className={styles.col}><strong>{item.currency} {numeral(paid ? 0 : item.balance).format('$0,0.00')}</strong></div>
        </div>
      )
    };

    let renderTotalAmount = () => {
      if (item.type === 'estimate') return (
        <div className={styles.row}>
          <div className={styles.col}><strong>Total</strong></div>
          <div className={styles.col}><strong>{item.currency} {numeral(item.amount).format('$0,0.00')}</strong></div>
        </div>
      );

      return (
        <div className={styles.row}>
          <div className={styles.col}>Total</div>
          <div className={styles.col}>{numeral(item.amount).format('$0,0.00')}</div>
        </div>
      )
    };

    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>Subtotal</div>
          <div className={styles.col}>{numeral(item.subtotal).format('$0,0.00')}</div>
        </div>

        {item.discount > 0 ?
          <div className={styles.row}>
            <div className={styles.col}>Discount</div>
            <div className={styles.col}>-{numeral(item.discount).format('$0,0.00')}</div>
          </div>
        : '' }

        <div className={styles.row}>
          <div className={styles.col}>Taxes ({item.taxPercent}%)</div>
          <div className={styles.col}>{numeral(item.taxes).format('$0,0.00')}</div>
        </div>

        {renderTotalAmount()}        

        {item.deposit > 0 ?
          <div className={styles.row}>
            <div className={styles.col}>Deposit</div>
            <div className={styles.col}>{numeral(item.deposit).format('$0,0.00')}</div>
          </div>
        : ''}

        {renderBalanceDue()}
      </div>
    )
  }
}
