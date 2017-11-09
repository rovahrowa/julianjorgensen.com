import React from 'react';
import styles from './index.css';

export default ({ dynamicOverlayStyles }) => (
  <div className={styles.overlay} style={dynamicOverlayStyles} />
);
