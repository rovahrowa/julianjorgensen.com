import React from 'react';
import Button from 'components/Button';
import styles from './index.css';

export default class LandingCategories extends React.Component {
  render() {
    let { position } = this.props.position || {};
    let categoryLeftStyles,
    categoryRightStyles,
    leftDescriptionStyles,
    rightDescriptionStyles = {};

    if (position) {
      console.log('position', position);
      let categoryWidth = window.innerWidth/2;

      let coordinates = position;
      let maxPercentage = 100;
      let int = 0.2;
      let positionPercentage = Math.round((coordinates.x/categoryWidth)*maxPercentage);
      let leftPositionPercentage = maxPercentage-positionPercentage;
      let rightPositionPercentage = positionPercentage-maxPercentage;

      // categoryLeftStyles = {
      //   transform: `translateY(-${(leftPositionPercentage)*int}%)`,
      //   opacity: 0.6+(leftPositionPercentage * 0.004)
      // }
      // categoryRightStyles = {
      //   transform: `translateY(-${(rightPositionPercentage)*int}%)`,
      //   opacity: 0.6+(rightPositionPercentage * 0.004)
      // }

      // leftDescriptionStyles = {
      //   opacity: 0+(leftPositionPercentage * 0.01)
      // }

      // rightDescriptionStyles = {
      //   opacity: 0+(rightPositionPercentage * 0.01)
      // }
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.category} style={categoryLeftStyles}>
          <h2 className={styles.categoryHeader}>UI/UX Developer</h2>
          <div className={styles.description} style={leftDescriptionStyles}>
            <p>The new design trend is here for good. We expect everything to be intuitive, solid, and simple.</p>
            <Button
              label='See more'
              hollow
              tiny
              blue
              className={styles.cta}
            />
          </div>
        </div>
        <div className={styles.category} style={categoryRightStyles}>
          <h2 className={styles.categoryHeader}>Full-Stack Developer</h2>
          <div className={styles.description} style={rightDescriptionStyles}>
            <p>Fluent in both design and code, frontend and backend, I'm your versatil. From protypes to launch and beyond.</p>
            <Button
              label='See more'
              hollow
              tiny
              blue
              className={styles.cta}
            />
          </div>
        </div>
      </div>
    )
  }
}
