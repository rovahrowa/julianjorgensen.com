import React from 'react';
import Button from 'components/Button';
import styles from './index.css';

export default ({
  item,
  customer,
}) => (
  <div className={styles.container}>
    <div className={styles.ctas}>
      <Button label="Print estimate" onClick={() => window.print()} />
    </div>
  </div>
);
