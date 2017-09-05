import React from 'react';
import _ from 'lodash';
import numeral from 'numeral';

import styles from './index.css';

export default class InvoiceItems extends React.Component {
  render() {
    let { invoice, customer, paid } = this.props;

    console.log('invoice from invocie items', invoice);

    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.description}>
            <label>Description</label>
          </div>
          <div className={styles.units}>
            <label>Hours</label>
          </div>
          <div className={styles.rate}>
            <label>Rate</label>
          </div>
          <div className={styles.total}>
            <label>Total</label>
          </div>
        </header>

        <div className={styles.items}>
          {
            invoice.items.map((item, index) => {
              if (!item.SalesItemLineDetail){
                return false;
              }
              return (
                <div className={styles.item} key={index}>
                  <div className={styles.description}>
                    {item.SalesItemLineDetail.ItemRef.name}: {item.Description}
                  </div>
                  <div className={styles.units}>
                    {item.SalesItemLineDetail.Qty}
                  </div>
                  <div className={styles.rate}>
                    {numeral(item.SalesItemLineDetail.UnitPrice).format('$0,0.00')}
                  </div>
                  <div className={styles.total}>
                    {numeral(item.Amount).format('$0,0.00')}
                  </div>
                </div>
              )
            })
          }
        </div>

        <small>(For more details please refer to the time-entries below.)</small>
      </div>
    )
  }
}
