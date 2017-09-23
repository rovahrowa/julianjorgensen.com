import React from 'react';
import styles from './index.css';

import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play.svg';

const LandingFooter = ({dynamicStyles}) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.content} style={dynamicStyles}>
        <div className={styles.profileImage}></div>
        <div className={styles.watchVideo}>
          <div className={styles.icon}><PlayIcon /></div>
          <div className={styles.label}>Watch Video</div>
        </div>
      </div>
      <div className={styles.footerBorder}></div>
      <footer className={styles.footer}></footer>
    </div>
  )
};

export default LandingFooter;
