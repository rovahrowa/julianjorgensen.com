import React from 'react';
import MobileNav from './components/MobileNav';
import DesktopNav from './components/DesktopNav';
import styles from './index.css';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <MobileNav className={styles.mobileNav} />
        <DesktopNav className={styles.desktopNav} />
      </div>
    )
  }
}
