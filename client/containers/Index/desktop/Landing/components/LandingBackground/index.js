import React from 'react';
import styles from './index.css';

export default class LandingBackground extends React.Component {
  render() {
    let { position } = this.props.position || {};
    let dynamicOverlayStyles = {}

    if (position && this.props.active) {
      let splitWindowWidth = window.innerWidth / 2;

      let coordinates = position;
      let maxPercentage = 1;
      let positionPercentage = (coordinates.x / splitWindowWidth) * maxPercentage;
      let leftPositionPercentage = maxPercentage - positionPercentage;
      let rightPositionPercentage = positionPercentage - maxPercentage;

      dynamicOverlayStyles = {
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, ${rightPositionPercentage}) 45%, rgba(0, 0, 0, ${leftPositionPercentage}) 55%)`
      }
    }

    return (
      <div className={styles.wrapper}>
        <video loop autoPlay controls className={styles.video}>
          <source src='/videos/julian-jorgensen-northern-lights.mp4' type='video/mp4' />
          <source src='/videos/julian-jorgensen-northern-lights.webm' type='video/webm' />
        </video>
        <div className={styles.overlay} style={dynamicOverlayStyles}></div>
      </div>
    )
  }
}
