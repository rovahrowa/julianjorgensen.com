import React from 'react';
import styles from './index.css';

export default ({
  position,
  active,
}) => {
  let dynamicOverlayStyles = {};

  console.log('cursorposiiton', position);
  if (position && active) {
    const splitWindowWidth = window.innerWidth / 2;

    const coordinates = position.position;
    const maxPercentage = 1;
    const positionPercentage = (coordinates.x / splitWindowWidth) * maxPercentage;
    const leftPositionPercentage = maxPercentage - positionPercentage;
    const rightPositionPercentage = positionPercentage - maxPercentage;

    console.log('positionPercentage', positionPercentage);
    
    dynamicOverlayStyles = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, ${rightPositionPercentage}) 45%, rgba(0, 0, 0, ${leftPositionPercentage}) 55%)`,
    };
  }

  return (
    <div className={styles.wrapper}>
      <video loop autoPlay controls className={styles.video} poster="/images/northern-lights.jpg">
        <source src="/videos/julian-jorgensen-northern-lights.mp4" type="video/mp4" />
        <source src="/videos/julian-jorgensen-northern-lights.webm" type="video/webm" />
      </video>
      <div className={styles.overlay} style={dynamicOverlayStyles} />
    </div>
  );
};
