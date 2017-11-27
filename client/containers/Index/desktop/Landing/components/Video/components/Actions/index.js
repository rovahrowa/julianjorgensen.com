import React from 'react';
import cn from 'classnames';
import profileImage from 'assets/images/julian-headshot-transparent.png';
import PlayIcon from 'assets/icons/FontAwesome/solid/play.svg';
import SeeMore from '../SeeMore';
import styles from './index.css';

export default ({ isPlaying, hasVideoPlayed, mute, handleToggleSound, handleVideoClick }) => {
  if (!hasVideoPlayed) {
    const wrapperStyles = cn(styles.wrapper, {
      [styles.isPlaying]: isPlaying,
    });

    return (
      <div className={wrapperStyles}>
        {/* <div className={styles.profileImage} style={{ backgroundImage: `url(${profileImage})` }} /> */}
        <div className={styles.watchVideo}>
          <div className={styles.icon} onClick={handleVideoClick}><PlayIcon /></div>
          <div className={styles.label} onClick={handleVideoClick}>Watch Video</div>
        </div>
      </div>
    );
  }

  return (
    <SeeMore
      videoMute={mute}
      handleToggleSound={handleToggleSound}
      hasVideoPlayed={hasVideoPlayed}
      handleReplay={handleVideoClick}
    />
  );
};
