import React from 'react';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';
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
        <div className={styles.watchVideo}>
          <div className={styles.ctaWrapper} onClick={handleVideoClick} data-tip="Watch my video" data-effect="solid">
            <PlayIcon />
            <div className={styles.circle}></div>
          </div>
        </div>
        <ReactTooltip />
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
