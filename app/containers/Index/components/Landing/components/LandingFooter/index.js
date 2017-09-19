import React from 'react';
import styles from './index.css';

import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play.svg';

const LandingFooter = () => {

  return (
    <div>
      <div className={styles.preFooter}></div>
      <footer className={styles.footer}>
        <div className={styles.watchVideo}>
          <div className={styles.icon}><PlayIcon /></div>
          <div className={styles.label}>Watch Video</div>
        </div>
      </footer>
    </div>
  )
};

export default LandingFooter;
