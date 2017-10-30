import React from 'react';
import styles from './index.css';

export default (
  <div className={styles.container}>
    <div className={styles.item}>
      <img
        src="/images/ca-flag.jpg"
        className={styles.flag}
        alt="Canada flag"
      />

      <div className={styles.detail}>
        <label>Account Holder</label>
        <span>Flo Digital Inc.</span>
      </div>

      <div className={styles.detail}>
        <label>Institution Number</label>
        <span>004</span>
      </div>

      <div className={styles.detail}>
        <label>Transit Number</label>
        <span>02810</span>
      </div>

      <div className={styles.detail}>
        <label>Account Number</label>
        <span>5229615</span>
      </div>

      <hr />

      <p>Or e-transfer to<br />me@julianjorgensen.com</p>
    </div>

    <div className={styles.item}>
      <img
        src="/images/us-flag.jpg"
        className={styles.flag}
        alt="US Flag"
      />

      <div className={styles.detail}>
        <label>Account Holder</label>
        <span>Jorgensen Julian</span>
      </div>

      <div className={styles.detail}>
        <label>Account Number</label>
        <span>8310017264</span>
      </div>

      <div className={styles.detail}>
        <label>ACH Routing Number</label>
        <span>026073150</span>
      </div>

      <div className={styles.detail}>
        <label>Wire Routing Number</label>
        <span>026073008</span>
      </div>

      <div className={styles.detail}>
        <label>Address</label>
        <span>TransferWise 19 W 24th<br />Street New York 10010<br />United States of America</span>
      </div>
    </div>

    <div className={styles.item}>
      <img
        src="/images/euro-flag.jpg"
        className={styles.flag}
        alt="EU Flag"
      />

      <div className={styles.detail}>
        <label>Account Holder</label>
        <span>TW Jorgensen Julian</span>
      </div>

      <div className={styles.detail}>
        <label>Bank code (SWIFT / BIC)</label>
        <span>DEKTDE7GXXX</span>
      </div>

      <div className={styles.detail}>
        <label>IBAN</label>
        <span>DE36 7001 1110 6050 2992 42</span>
      </div>

      <div className={styles.detail}>
        <label>Address</label>
        <span>Deutsche Handelsbank<br />Südliche Münchner Str.<br />2 Grünwald 82031<br />Deutschland</span>
      </div>

      <div className={styles.detail}>
        <label></label>
        <span></span>
      </div>

      <div className={styles.detail}>
        <label></label>
        <span></span>
      </div>

    </div>
  </div>
);
