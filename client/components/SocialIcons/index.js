import React from 'react';
import cn from 'classnames';
import GithubIcon from 'assets/icons/FontAwesome/brands/github.svg';
import LinkedInIcon from 'assets/icons/FontAwesome/brands/linkedin-in.svg';
import AngelListIcon from 'assets/icons/FontAwesome/brands/angellist.svg';
import styles from './index.css';

export default ({
  className, color, large, ...others
}) => {
  const wrapperStyles = cn(className, {
    [styles.white]: color === 'white',
    [styles.black]: color === 'black',
    [styles.large]: large,
  }, styles.container);

  return (
    <div className={wrapperStyles}>
      <a href="https://github.com/julianjorgensen" target="new" className={styles.icon}><GithubIcon /></a>
      <a href="https://www.linkedin.com/in/julianjorgensen" target="new" className={styles.icon}><LinkedInIcon /></a>
      <a href="https://angel.co/julianjorgensen" target="new" className={styles.icon}><AngelListIcon /></a>
    </div>
  );
};
