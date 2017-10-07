import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Quote from 'components/Quote';


import styles from './index.css';

import HomeLanding from './Landing';
import NavBlock from './components/NavBlock';

export default class HomeMobile extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <HomeLanding />
        <Quote
          body='I would recommend him to any team looking for a quality front-end developer.'
          author='Mark Fromson'
          authorTitle='CEO, localsolo.com'
          avatarUrl='images/mark-fromson.png'
          className={styles.quote}
        />

        <div className={styles.navBlocks}>
          <NavBlock className={styles.frontEnd} title='FrontEnd development' tags={['design', 'animations', 'performance', 'scalable']} />
          <NavBlock className={styles.fullStack} title='FullStack development' tags={['Node', 'Javascript', 'API', 'secure']} />
          <NavBlock className={styles.ux} title='User Experience' tags={['Web architecture', 'Wireframeing', 'UX development', 'Prototyping']} />
          <NavBlock className={styles.automation} title='Automation' tags={['billing', 'social media', 'api', 'emails']} />
        </div>
      </div>
    )
  }
}
