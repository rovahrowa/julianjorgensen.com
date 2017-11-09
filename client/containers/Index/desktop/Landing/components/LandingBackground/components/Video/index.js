import React from 'react';
import videoPosterImage from 'assets/images/northern-lights.jpg';
import styles from './index.css';

export default () => (
  <video loop autoPlay controls className={styles.video} poster={videoPosterImage}>
    <source src="/videos/julian-jorgensen-northern-lights.mp4" type="video/mp4" />
    <source src="/videos/julian-jorgensen-northern-lights.webm" type="video/webm" />
  </video>
);
