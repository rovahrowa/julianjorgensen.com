import React from 'react';
import cn from 'classnames';
import Button from 'components/Button';
import PlayIcon from 'assets/icons/FontAwesome/solid/play.svg';
import SeeMore from '../SeeMore';
import styles from './index.css';

export default ({ isPlaying, hasVideoPlayed, mute, handleToggleSound, handleVideoClick, showVideoCta }) => {
  if (!hasVideoPlayed) {
    const wrapperStyles = cn(styles.wrapper, {
      [styles.isPlaying]: isPlaying,
    });

    const ctaButtonStyles = cn(styles.ctaButton, {
      [styles.show]: showVideoCta,
    });

    return (
      <div className={wrapperStyles}>
        <div className={styles.watchVideo}>
          <div className={styles.ctaWrapper} onClick={handleVideoClick}>
            <button onClick={handleVideoClick} className={ctaButtonStyles}>Watch video</button>
            <PlayIcon />
            <div className={styles.circle}></div>
          </div>
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
