import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from 'components/Button';
import Quote from 'components/Quote';

import styles from './index.css';

import HomeLanding from './desktop/Landing';
import FullStack from './desktop/FullStack';
import FrontEnd from './desktop/FrontEnd';
import Ux from './desktop/Ux';
import Automation from './desktop/Automation';

import HomeLandingMobile from './mobile/Landing';

export default class Index extends React.Component {
  componentDidMount() {
    // this.props.onLoaded;
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.mobile}>
          <HomeLandingMobile />
          <Quote
            body='I would recommend him to any team looking for a quality front-end developer.'
            author='Mark Fromson'
            authorTitle='CEO, localsolo.com'
            avatarUrl='images/mark-fromson.png'
            className={styles.quote}
          />
        </div>
        <div className={styles.desktop}>
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
          <FullStack />
          <Ux />
          <Automation />
        </div>
      </div>
    )
  }
}
