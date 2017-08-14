import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import RTButton from 'react-toolbox/lib/button';
import styles from './index.css';

const Button = ({ className, white, hollow, primary, blue, tiny, theme, href, ...others }) => {
  const _className = cn(className, {
    [styles.white]: white,
    [styles.hollow]: hollow,
    [styles.primary]: primary,
    [styles.tiny]: tiny,
    [styles.blue]: blue
  });

  if (href === undefined) {
    return <RTButton className={_className} theme={styles} {...others}/>;
  }

  return (
    <Link to={href}>
      <RTButton className={_className} theme={styles} {...others}/>
    </Link>
  )
};

export default Button;
