import React from 'react';
import Quote from 'components/Quote';
import authorImage from 'assets/images/mark-fromson.png';
import HomeLanding from './Landing';
import NavBlock from './components/NavBlock';
import styles from './index.css';

export default () => (
  <div className={styles.wrapper}>
    <HomeLanding />
    <Quote
      body="I would recommend him to any team looking for a quality front-end developer."
      author="Mark Fromson"
      authorTitle="CEO, localsolo.com"
      authorImage={authorImage}
      className={styles.quote}
    />

    <div className={styles.navBlocks}>
      <NavBlock className={styles.frontEnd} title="FrontEnd development" tags={['React Javascript', 'UI', 'Animations', 'Responsive', 'Performance']} />
      <NavBlock className={styles.ux} title="UX development" tags={['Web architecture', 'Wireframeing', 'UX development', 'Prototyping']} />
      <NavBlock className={styles.fullStack} title="FullStack development" tags={['Node', 'Javascript', 'API', 'secure']} />
      <NavBlock className={styles.automation} title="Web automation" tags={['billing', 'social media', 'api', 'emails']} />
    </div>
  </div>
);
