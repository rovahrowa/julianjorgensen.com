import React from 'react';
import cn from 'classnames';

import GithubIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/brands/github.svg';
import LinkedInIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/brands/linkedin-in.svg';
import AngelListIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/brands/angellist.svg';

import styles from './index.css';

const SocialIcons = ({ className, color, large, ...others }) => {
  const _className = cn(className, {
    [styles.white]: color === 'white',
    [styles.black]: color === 'black',
    [styles.large]: large
  }, styles.container);

  return (
    <div className={_className}>
      <a href='https://github.com/julianjorgensen' target='new' className={styles.icon}><GithubIcon /></a>
      <a href='https://www.linkedin.com/in/julian-jorgensen-9a889b73' target='new' className={styles.icon}><LinkedInIcon /></a>
      <a href='https://angel.co/julianjorgensen' target='new' className={styles.icon}><AngelListIcon /></a>
    </div>
  )
};

export default SocialIcons;
