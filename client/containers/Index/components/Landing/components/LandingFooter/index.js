import React from 'react';
import cn from 'classnames';
import styles from './index.css';

import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play.svg';

const LandingFooter = ({ dynamicStyles, handleVideoClick, className, hasVideoPlayed }) => {
  let _wrapperStyles = cn(styles.wrapper, className);

  let renderAction = () => {
    if (!hasVideoPlayed) {
      return (
        <div className={styles.content} style={dynamicStyles}>
          <div className={styles.profileImage}></div>
          <div className={styles.watchVideo}>
            <div className={styles.icon} onClick={handleVideoClick}><PlayIcon /></div>
            <div className={styles.label} onClick={handleVideoClick}>Watch Video</div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className={_wrapperStyles}>
      {renderAction()}
      <div className={styles.footerBorder}></div>
      <footer className={styles.footer}></footer>
    </div>
  )
};

export default LandingFooter;
