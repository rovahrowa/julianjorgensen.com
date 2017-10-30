import React from 'react';
import { Desktop, MobileTablet } from 'utils/responsive';
import MobileNav from './components/MobileNav';
import DesktopNav from './components/DesktopNav';

export default () => (
  <div>
    <MobileTablet component={<MobileNav />} />
    <Desktop component={<DesktopNav />} />
  </div>
);
