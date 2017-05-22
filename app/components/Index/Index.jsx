import React from 'react';
import {Link} from 'react-router-dom';
let {connect} = require('react-redux');

import Layout from 'react-toolbox/lib/layout/Layout';
import styles from './Index.css';
import HomeLanding from 'Index/HomeLanding';

class Index extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="page-content">
        <HomeLanding />

        <div className={styles.container}>
          Content here
        </div>
      </div>
    )
  }
}


module.exports = Index;
