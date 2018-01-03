import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import DocumentMeta from 'react-document-meta';

import Routes from 'routes';
import Header from 'containers/Header';
import Calendly from 'components/Calendly';

import styles from './index.css';

ReactGA.initialize('UA-6241825-5'); // initialize Google Analytics

// site meta data
const meta = {
  title: 'Julian Jorgensen',
  description: 'UX &amp; Full-stack development',
  meta: {
    charset: 'utf-8',
  },
  auto: {
    ograph: true,
  }
};

@withRouter
@connect(({ site }) => ({
  site,
}))
export default class Main extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({ type: 'SITE_LOADED' });
  }

  render() {
    const { location, site } = this.props;
    return (
      <div className={styles.container}>
        <DocumentMeta {...meta} />
        <Header />
        <Routes contactActive={site.showContact} />
        {location.pathname !== '/schedule' ? <Calendly /> : ''}
      </div>
    );
  }
}
