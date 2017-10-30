import React from 'react';
import Button from 'components/Button';
import styles from './index.css';

export default ({
  item,
  customer,
  paid,
}) => (
  <div className={styles.container}>
    <div className={styles.ctas}>
      <Button label="Print invoice" onClick={() => window.print()} />
      {!paid ?
        <Button
          href="#pay"
          primary
          label="Pay now"
        /> : ''}
    </div>
  </div>
);
