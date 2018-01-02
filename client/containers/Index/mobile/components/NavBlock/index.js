import React from 'react';
import cn from 'classnames';
import AngleRightIcon from 'assets/icons/FontAwesome/regular/angle-right.svg';
import styles from './index.css';

export default ({ className, title, tags }) => {
  const wrapperStyles = cn(styles.wrapper, className);
  return (
    <div className={wrapperStyles}>
      <h2>{title}</h2>
      {/* <AngleRightIcon /> */}

      <div className={styles.tags}>
        {tags ? tags.map(tag => (
          <article className={styles.tag}>{tag}</article>
        )) : ''}
      </div>
    </div>
  );
};
