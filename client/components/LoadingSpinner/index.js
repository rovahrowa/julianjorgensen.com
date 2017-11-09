import React from 'react';
import cn from 'classnames';
import Logo from 'components/Logo';
import styles from './index.css';

export default ({ className }) => {
  const wrapperStyles = cn(className, styles.wrapper);
  return (
    <div className={wrapperStyles}>
      <Logo className={styles.logo} />
    </div>
  );
};
