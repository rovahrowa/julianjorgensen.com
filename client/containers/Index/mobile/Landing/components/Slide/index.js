import React from 'react';
import cn from 'classnames';
import styles from './index.css';

export default ({
  title, content, className, playButtonClassName, titleClassName, videoIsLoading, backgroundOverlay,
}) => {
  const slideStyles = cn(styles.slide, className);
  const headerStyles = cn(styles.header, titleClassName);
  return (
    <div className={slideStyles}>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1 className={headerStyles}>{title}</h1>
          {content}
        </div>
        {backgroundOverlay}
      </div>
    </div>
  );
};
