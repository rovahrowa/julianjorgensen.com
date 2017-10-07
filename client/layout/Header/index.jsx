import React from 'react';
import { Desktop, MobileTablet } from 'utils/responsive';
import MobileNav from './components/MobileNav';
import DesktopNav from './components/DesktopNav';
import styles from './index.css';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <MobileTablet component={<MobileNav />} />
        <Desktop component={<DesktopNav />} />
      </div>
    )
  }
}
