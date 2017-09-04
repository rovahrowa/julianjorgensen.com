import React from 'react';
import styles from './index.css';

const BankTransfer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <img
          src='/images/ca-flag.jpg'
          className={styles.flag}
        />
        <div className={styles.name}>Flo Digital Inc.</div>

        <div className={styles.detail}>
          <label>Institution number</label>
          <span>004</span>
        </div>

        <div className={styles.detail}>
          <label>Transit number</label>
          <span>02810</span>
        </div>

        <div className={styles.detail}>
          <label>Account number</label>
          <span>5229615</span>
        </div>

        <hr />

        <p>Or e-transfer to<br />me@julianjorgensen.com</p>
      </div>

      {/* <div className={styles.item}>
        <img
          src='/images/us-flag.jpg'
          className={styles.flag}
        />
        <div className={styles.name}>Flo Digital Inc.</div>

        <div className={styles.detail}>
          <label>Institution number</label>
          <span>004</span>
        </div>

        <div className={styles.detail}>
          <label>Transit number</label>
          <span>02810</span>
        </div>

        <div className={styles.detail}>
          <label>Account number</label>
          <span>5229615</span>
        </div>
      </div>

      <div className={styles.item}>
        <img
          src='/images/dk-flag.jpg'
          className={styles.flag}
        />
        <div className={styles.name}>Flo Digital Inc.</div>

        <div className={styles.detail}>
          <label>Institution number</label>
          <span>004</span>
        </div>

        <div className={styles.detail}>
          <label>Transit number</label>
          <span>02810</span>
        </div>

        <div className={styles.detail}>
          <label>Account number</label>
          <span>5229615</span>
        </div>
      </div> */}
    </div>
  )
};

export default BankTransfer;
