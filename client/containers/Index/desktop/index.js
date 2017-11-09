import React from 'react';
import Quote from 'components/Quote';
import markFromsonProfile from 'assets/images/mark-fromson.png';
import HomeLanding from './Landing';
import FullStack from './FullStack';
import FrontEnd from './FrontEnd';
import Ux from './Ux';
import Automation from './Automation';
import styles from './index.css';

export default () => (
  <div className={styles.wrapper}>
    <HomeLanding />

    <div id="details" />

    <Quote
      body="I would recommend him to any team looking for a quality front-end developer."
      author="Mark Fromson"
      authorTitle="CEO, localsolo.com"
      authorImage={markFromsonProfile}
      className={styles.quote}
    />
    <FrontEnd />
    <Ux />
    <FullStack />
    <Automation />
  </div>
);
