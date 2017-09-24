import React from 'react';
import numeral from 'numeral';

import styles from './index.css';

export default class BillingItems extends React.Component {
  render() {
    let {
      item,
      customer,
      paid
    } = this.props;

    return (
      <div className={styles.container}>
        {item.projectName ?
          <div className={styles.projectName}>
            <label>Project name</label>
            <div>{item.projectName}</div>
          </div>
        : ''}

        <header className={styles.header}>
          <div className={styles.description}>
            <label>Description</label>
          </div>
          <div className={styles.units}>
            <label>Qty / Hours</label>
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
            item.items.map((item, index) => {
              if (!item.SalesItemLineDetail) {
                return false;
              }
              return (
                <div className={styles.item} key={index}>
                  <div className={styles.description}>
                    {item.SalesItemLineDetail.ItemRef.name}{item.Description ? `: ${item.Description}` : ''}
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
      </div>
    )
  }
}
