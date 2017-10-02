import React from 'react';
import { HashLink } from 'lib/react-router-hash-link';

import AngleDownIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/angle-down.svg';
import ReplayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/redo.svg';
import MuteIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/volume-mute.svg';
import UnMuteIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/volume-up.svg';
import styles from './index.css';

const SeeMore = ({ handleReplay, hasVideoPlayed, handleToggleSound, videoMute }) => {
  let videoActions = () => {
    if (hasVideoPlayed) {
      return (
        <div className={styles.videoActions}>
          <div className={styles.replay} onClick={handleReplay}><ReplayIcon /></div>
          <div className={styles.mute} onClick={handleToggleSound}>{videoMute ? <MuteIcon /> : <UnMuteIcon />}</div>
        </div>
      )
    }
  }

  return (
    <div className={styles.container}>
      {videoActions()}
      <HashLink to='#details'>
        <div className={styles.seeMore}>
          <span>Scroll to see more</span>
          <div className={styles.arrow}><AngleDownIcon /></div>
          <div className={styles.arrow}><AngleDownIcon /></div>
          <div className={styles.arrow}><AngleDownIcon /></div>
        </div>
      </HashLink>
    </div>
  )
};

export default SeeMore;
