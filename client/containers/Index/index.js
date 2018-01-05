import React from 'react';
import { Desktop, MobileTablet } from 'utils/responsive';
import Footer from 'containers/Footer';
import Home from './desktop';
import HomeMobile from './mobile';
import styles from './index.css';

export default ({ content }) => (
  <div className={styles.wrapper}>
    <MobileTablet component={<HomeMobile content={content} />} />
    <Desktop component={<Home content={content} />} />
    <Footer estimate faq />
  </div>
);
