import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from 'components/Button';
import Quote from 'components/Quote';

import styles from './index.css';

import HomeLanding from './components/Landing';
import FullStack from './components/FullStack';
import FrontEnd from './components/FrontEnd';
import Ux from './components/Ux';
import Automation from './components/Automation';

export default class Index extends React.Component {
  constructor() {
    super();
  }

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
        <FullStack />
        <FrontEnd />
        <Ux />
        <Automation />
      </div>
    )
  }
}
