import React from 'react';
import { Desktop, MobileTablet } from 'utils/responsive';
import Footer from 'containers/Footer';
import styles from './index.css';

export default () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <MobileTablet>
        <iframe className={styles.iframe} title="Julian Jorgensen Calendly" src="https://calendly.com/julianjorgensen" width="100%" height="900px" allowFullScreen />
      </MobileTablet>
      <Desktop>
        <iframe className={styles.iframe} title="Julian Jorgensen Calendly" src="https://calendly.com/julianjorgensen" width="100%" height="800px" allowFullScreen />
      </Desktop>
    </div>
    <Footer faq />
  </div>
);
