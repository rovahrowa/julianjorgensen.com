import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from 'components/Button';

import styles from './index.css';
import HomeLanding from './components/Landing';
import UiUx from './components/UiUx';
import FrontEnd from './components/FrontEnd';

export default class Index extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles.container}>
        <HomeLanding />

        <UiUx />
        <FrontEnd />
      </div>
    )
  }
}
