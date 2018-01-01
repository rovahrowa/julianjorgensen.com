import React from 'react';
import { Desktop, MobileTablet } from 'utils/responsive';
import MobileNav from './components/MobileNav';
import DesktopNav from './components/DesktopNav';
import styles from './index.css';

export default (props) => (
  <div className={styles.wrapper}>
    <MobileTablet component={<MobileNav {...props} />} />
    <Desktop component={<DesktopNav {...props} />} />
  </div>
);
