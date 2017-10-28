import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Button';
import Quote from 'components/Quote';

import styles from './index.css';

import HomeLanding from './Landing';
import FullStack from './FullStack';
import FrontEnd from './FrontEnd';
import Ux from './Ux';
import Automation from './Automation';

export default class HomeDesktop extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <HomeLanding />
    
        <a id='details' />

        <Quote
          body='I would recommend him to any team looking for a quality front-end developer.'
          author='Mark Fromson'
          authorTitle='CEO, localsolo.com'
          avatarUrl='images/mark-fromson.png'
          className={styles.quote}
        />
        <FrontEnd />
        <Ux />
        <FullStack />
        <Automation />
    </div>
    )
  }
}
