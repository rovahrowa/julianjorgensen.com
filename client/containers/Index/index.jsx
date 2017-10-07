import React from 'react';
import { Desktop, MobileTablet } from 'utils/responsive';

import styles from './index.css';

import Home from './desktop';
import HomeMobile from './mobile';

export default class Index extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        {/*<MobileTablet component={<HomeMobile />} />*/}
        <Desktop component={<Home />} />
      </div>
    )
  }
}
