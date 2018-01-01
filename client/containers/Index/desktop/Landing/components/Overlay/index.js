import React, { Component } from 'react';
import styles from './index.css';

export default class LandingOverlay extends Component {
  state = {};

  render() {
    const { cursorPosition } = this.props;
    let dynamicOverlayStyles = {};

    if (cursorPosition) {
      const splitWindowWidth = window.innerWidth / 2;

      const coordinates = cursorPosition.position;
      const maxPercentage = 1;
      const positionPercentage = (coordinates.x / splitWindowWidth) * maxPercentage;
      const leftPositionPercentage = maxPercentage - positionPercentage;
      const rightPositionPercentage = positionPercentage - maxPercentage;

      dynamicOverlayStyles = {
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, ${rightPositionPercentage}) 45%, rgba(0, 0, 0, ${leftPositionPercentage}) 55%)`,
      };
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.overlay} style={dynamicOverlayStyles} />
      </div>
    );
  }
}
