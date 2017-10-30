import React, { Component } from 'react';
import { Desktop, MobileTablet } from 'utils/responsive';
import Home from './desktop';
import HomeMobile from './mobile';
import styles from './index.css';

export default () => (
  <div className={styles.wrapper}>
    {/* <MobileTablet component={<HomeMobile />} /> */}
    <Desktop component={<Home />} />
  </div>
);
