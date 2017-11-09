import React from 'react';
import CanadaFlag from 'assets/images/ca-flag.jpg';
import styles from './index.css';

export default () => (
  <div className={styles.container}>
    <div className={styles.item}>
      <div className={styles.header}>Please send the cheque to</div>
      <img
        src={CanadaFlag}
        className={styles.flag}
        alt="Canada flag"
      />
      <div className={styles.name}>Flo Digital Inc.</div>
      <address>308 5th ave E,<br />Vancouver, Canada<br />V5T 1H4</address>
    </div>
  </div>
);
