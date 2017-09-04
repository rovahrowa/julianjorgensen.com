import React from 'react';
import styles from './index.css';

const Cheque = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img
          src='/images/ca-flag.jpg'
          className={styles.flag}
        />
        <div className={styles.name}>Flo Digital Inc.</div>
        <address>308 5th ave E,<br />Vancouver, Canada<br />V5T 1H4</address>
      </div>
    </div>
  )
};

export default Cheque;
