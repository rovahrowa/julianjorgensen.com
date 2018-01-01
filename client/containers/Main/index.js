import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ParallaxController } from 'lib/react-scroll-parallax';
import ReactGA from 'react-ga';
import DocumentMeta from 'react-document-meta';
import { ParallaxProvider } from 'react-scroll-parallax';

import Routes from 'routes';
import Header from 'containers/Header';
import Calendly from 'components/Calendly';

import styles from './index.css';

ParallaxController.init();
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
@connect()
export default class Main extends Component {
  state = {};

  componentDidMount() {
    this.props.dispatch({ type: 'SITE_LOADED' });
  }

  handleContactToggle = () => {
    this.setState({
      contactActive: !this.state.contactActive,
    });
  }

  render() {
    const { location } = this.props;
    return (
      <div className={styles.container}>
        <DocumentMeta {...meta} />
        <Header onContactToggle={this.handleContactToggle} />
        <ParallaxProvider>
          <Routes contactActive={this.state.contactActive} />
        </ParallaxProvider>
        {location.pathname !== '/schedule' ? <Calendly /> : ''}
      </div>
    );
  }
}
