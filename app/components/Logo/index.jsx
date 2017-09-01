import React from 'react';
import cn from 'classnames';

import LogoSVG from '-!svg-react-loader?name=Icon!assets/icons/julian-jorgensen-logo.svg';
import styles from './index.css';

const Logo = ({ className, color, size, ...others }) => {
  const _className = cn(className, {
    [styles.white]: color === 'white',
    [styles.black]: color === 'black'
  });

  return (
    <LogoSVG
      className={_className}
      {...others}
      style={{
        width: size,
        height: size
      }}
    />
  )
};

export default Logo;
