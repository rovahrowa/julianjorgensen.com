import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'lib/react-router-hash-link';
import cn from 'classnames';
import RTButton from 'react-toolbox/lib/button';
import styles from './index.css';

const Button = ({ className, white, hollow, primary, blue, small, tiny, theme, target, href, ...others }) => {
  const _className = cn(className, styles.custom, {
    [styles.white]: white,
    [styles.hollow]: hollow,
    [styles.primary]: primary,
    [styles.tiny]: tiny,
    [styles.small]: small,
    [styles.blue]: blue
  });

  if (href === undefined) {
    return <RTButton className={_className} theme={styles} {...others}/>;
  }

  return (
    <HashLink to={href} target={target}>
      <RTButton className={_className} theme={styles} {...others}/>
    </HashLink>
  )
};

export default Button;
