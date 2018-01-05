import React from 'react';
import cn from 'classnames';
import Button from 'components/Button';
import ReactLogo from 'assets/icons/colored/react-logo-vector.svg';
import ShopifyLogo from 'assets/icons/colored/shopify-logo-vector.svg';
import FirebaseLogo from 'assets/icons/colored/firebase-logo-vector.svg';
import StripeLogo from 'assets/icons/colored/stripe-logo.svg';
import NodeLogo from 'assets/icons/colored/node-logo.svg';
import styles from './index.css';

export default ({ playingVideo, content }) => {
  const { jobtitles } = content || {};
  const wrapperStyles = cn(styles.wrapper, {
    [styles.isPlayingVideo]: playingVideo,
  });
  let categoryLeftStyles;
  let categoryRightStyles;
  let leftDescriptionStyles;
  const rightDescriptionStyles = {};

  const renderCustomCategoryFeatures = (item) => {
    if (!jobtitles[item]) return false;
    if (jobtitles[item].fields.tags) {
      return (
        <div className={styles.features}>
          {jobtitles[item].fields.tags.map(tag => <div className={styles.feature}>{tag}</div>)}
        </div>
      );
    }

    return (
      <div className={styles.features}>
        {jobtitles[item].fields.technologies.map((technology) => {
          switch (technology.toLowerCase()) {
            case 'react': return <ReactLogo />;
            case 'shopify': return <ShopifyLogo />;
            case 'firebase': return <FirebaseLogo />;
            case 'stripe': return <StripeLogo className={styles.fillWhite} />;
            case 'node': return <NodeLogo />;
            default: return '';
          }
        })}
      </div>
    );
  };

  const renderDefaultLeftCategoryFeatures = () => (
    <div className={styles.features}>
      <div className={styles.feature}>Speed optimization</div>
      <div className={styles.feature}>Animations</div>
      <div className={styles.feature}>CSS architecture</div>
    </div>
  );

  const renderDefaultRightCategoryFeatures = () => (
    <div className={styles.features}>
      <ReactLogo />
      <ShopifyLogo />
      <FirebaseLogo />
    </div>
  );

  const renderLeftCategoryFeatures = () => {
    if (jobtitles) return renderCustomCategoryFeatures(0);
    return renderDefaultLeftCategoryFeatures();
  };

  const renderRightCategoryFeatures = () => {
    if (jobtitles) return renderCustomCategoryFeatures(1);
    return renderDefaultRightCategoryFeatures();
  };

  const renderLeftCategoryDescription = (item) => {
    if (jobtitles) return jobtitles[0].fields.description;
    return 'Great designs are nothing without great implementation. I focus on bringing UX into development - merging design and code.';
  };

  const renderRightCategoryDescription = (item) => {
    if (jobtitles) return jobtitles[1].fields.description;
    return 'I\'m with you full-cycle; from prototypes and styling, to API integrations and launch.';
  };

  return (
    <div className={wrapperStyles}>
      <div className={styles.category} style={categoryLeftStyles}>
        <h2 className={styles.categoryHeader}>{jobtitles ? jobtitles[0].fields.title : 'UI/UX Engineer'}</h2>

        {renderLeftCategoryFeatures()}

        <div className={styles.description} style={leftDescriptionStyles}>
          <p>{renderLeftCategoryDescription()}</p>
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
        <h2 className={styles.categoryHeader}>{jobtitles ? jobtitles[1].fields.title : 'Full-Stack Developer'}</h2>

        {renderRightCategoryFeatures()}

        <div className={styles.description} style={rightDescriptionStyles}>
          <p>{renderRightCategoryDescription()}</p>
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
