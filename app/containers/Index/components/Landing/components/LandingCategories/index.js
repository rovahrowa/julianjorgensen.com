import React from 'react';
import styles from './index.css';

export default class LandingCategories extends React.Component{
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.category}>
          <h2 className={styles.categoryHeader}>UI/UX Developer</h2>
          <p className={styles.description}>The new design trend is here for good. We expect everything to be intuitive, solid, and simple. We only want to see exactly what we’re looking for, and it should easily synchronize with our social media.</p>
        </div>
        <div className={styles.category}>
          <h2 className={styles.categoryHeader}>Full-Stack Developer</h2>
          <p className={styles.description}>The new design trend is here for good. We expect everything to be intuitive, solid, and simple. We only want to see exactly what we’re looking for, and it should easily synchronize with our social media.</p>
        </div>
      </div>
    )
  }
}
