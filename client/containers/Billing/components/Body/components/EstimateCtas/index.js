import React from 'react';
import Button from 'components/Button';
import styles from './index.css';

const EstimateCtas = ({
  item,
  customer
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.ctas}>
        <Button label='Print estimate' onClick={() => window.print()} />
      </div>
    </div>
  )
};

export default EstimateCtas;
