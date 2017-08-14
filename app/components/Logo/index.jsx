import React from 'react';
import cn from 'classnames';

import styles from './index.css';
import 'assets/icons/julian-jorgensen-logo-black.svg';
import 'assets/icons/julian-jorgensen-logo-white.svg';

const Logo = ({ className, color, size, ...others }) => {
  const _className = cn(className, {
    [styles.white]: color === 'white',
    [styles.black]: color === 'black'
  });

  return (
    <div className={_className} {...others} style={{
      width: size,
      height: size
    }}></div>
  )
};

export default Logo;
