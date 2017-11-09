import React from 'react';
import cn from 'classnames';
import Button from 'components/Button';
import ReactLogo from 'assets/icons/colored/react-logo-vector.svg';
import ShopifyLogo from 'assets/icons/colored/shopify-logo-vector.svg';
import FirebaseLogo from 'assets/icons/colored/firebase-logo-vector.svg';
import styles from './index.css';

export default ({ playingVideo }) => {
  const wrapperStyles = cn(styles.wrapper, {
    [styles.isPlayingVideo]: playingVideo,
  });
  let categoryLeftStyles;
  let categoryRightStyles;
  let leftDescriptionStyles;
  const rightDescriptionStyles = {};

  return (
    <div className={wrapperStyles}>
      <div className={styles.category} style={categoryLeftStyles}>
        <h2 className={styles.categoryHeader}>UI/UX Developer</h2>
        <div className={styles.features}>
          <div className={styles.feature}>Speed optimization</div>
          <div className={styles.feature}>Animations</div>
          <div className={styles.feature}>CSS architecture</div>
        </div>
        <div className={styles.description} style={leftDescriptionStyles}>
          <p>Great designs are nothing without great implementation. I focus on bringing UX into development - merging design and code.</p>
          <Button
            label="See more"
            href="#details"
            hollow
            tiny
            blue
            className={styles.cta}
          />
        </div>
      </div>
      <div className={styles.category} style={categoryRightStyles}>
        <h2 className={styles.categoryHeader}>Full-Stack Developer</h2>
        <div className={styles.features}>
          <ReactLogo />
          <ShopifyLogo />
          <FirebaseLogo />
        </div>
        <div className={styles.description} style={rightDescriptionStyles}>
          <p>I'm with you full-cycle; from prototypes and styling, to API integrations and launch.</p>
          <Button
            label="See more"
            href="#details"
            hollow
            tiny
            blue
            className={styles.cta}
          />
        </div>
      </div>
    </div>
  );
};
