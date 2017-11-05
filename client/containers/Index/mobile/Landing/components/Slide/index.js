import React from 'react';
import cn from 'classnames';
import styles from './index.css';

export default ({
  title, content, className, playButtonClassName, titleClassName, videoIsLoading, backgroundOverlay, slideBgImage,
}) => {
  const slideClasses = cn(styles.slide, className);
  const headerStyles = cn(styles.header, titleClassName);
  return (
    <div className={slideClasses} style={slideBgImage ? { backgroundImage: `url(${slideBgImage})` } : {}}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={headerStyles}>{title}</h1>
          {content}
        </div>
      </div>
      {backgroundOverlay}
    </div>
  );
};
