import React from 'react';
import cn from 'classnames';
import AngleRightIcon from 'assets/icons/FontAwesome/regular/angle-right.svg';
import styles from './index.css';

export default ({ className, title, tags }) => {
  const wrapperStyles = cn(styles.wrapper, className);
  return (
    <div className={wrapperStyles}>
      <span>{title}</span>
      <AngleRightIcon />

      <div className={styles.tags}>
        {tags ? tags.map(tag => (
          <div className={styles.tag}>{tag}</div>
        )) : ''}
      </div>
    </div>
  );
};
