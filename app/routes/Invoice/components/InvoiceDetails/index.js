import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.css';

export default class InvoiceDetails extends React.Component {
  render() {
    let { invoice, customer, paid } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.id}><label>Invoice</label>{invoice.id}</div>

        <div className={styles.container}>
          <div className={styles.status}>
            {paid ? 'Paid on xx/xx/xxxx' : `${invoice.amountFormatted} is due on April 2017`}
          </div>

          <div className={styles.note}>
            Some more detail here...
          </div>

          <div className={styles.header}>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>From</label>
                <address>
                  FLO INC.<br />
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
                  FLO INC.<br />
                  Julian Jorgensen<br />
                  308 5th Ave E<br />
                  V5T 1H4, Vancouver <br />
                  B.C., Canada<br /><br />

                  me@julianjorgensen.com
                </address>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.col}>
                <label>Issued on</label>
                <date>Mar 19, 2017</date>
              </div>
              <div className={styles.col}>
                <label>Due on</label>
                <date>Apr 19, 2017</date>
              </div>
            </div>
          </div>

          <div className={styles.body}>
            <header className={styles.items}>
              <div className={styles.name}>
                <label>Item name</label>
              </div>
              <div className={styles.units}>
                <label>Units</label>
              </div>
              <div className={styles.rate}>
                <label>Rate</label>
              </div>
              <div className={styles.total}>
                <label>Total</label>
              </div>
            </header>

            <div className={styles.items}>
              <div className={styles.name}>
                name here
              </div>
              <div className={styles.units}>
                70
              </div>
              <div className={styles.rate}>
                $100.00
              </div>
              <div className={styles.total}>
                $9.000,00
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
