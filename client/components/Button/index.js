import React from 'react';
import { HashLink } from 'lib/react-router-hash-link';
import cn from 'classnames';
import { Button as RTButton } from 'react-toolbox/lib/button';
import styles from './index.css';

const Button = ({
  className,
  target,
  href,
  white,
  hollow,
  primary,
  tiny,
  small,
  blue,
  ...others
}) => {
  const buttonStyles = cn(className, styles.default, {
    [styles.white]: white,
    [styles.hollow]: hollow,
    [styles.primary]: primary,
    [styles.tiny]: tiny,
    [styles.small]: small,
    [styles.blue]: blue,
  });

  if (href === undefined) {
    return <RTButton className={buttonStyles} theme={styles} {...others} />;
  }

  return (
    <HashLink to={href} target={target}>
      <RTButton className={buttonStyles} theme={styles} {...others} />
    </HashLink>
  );
};

export default Button;
