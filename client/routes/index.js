import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { connect } from 'react-redux';
import cn from 'classnames';
import ReactGA from 'react-ga';
import Index from 'containers/Index';
import { Invoice, Estimate } from 'containers/Billing';
import About from 'containers/About';
import Schedule from 'containers/Schedule';
import FullStack from 'containers/FullStack';
import FrontEnd from 'containers/FrontEnd';
import Ux from 'containers/Ux';
import Automation from 'containers/Automation';
import Portfolio from 'containers/Portfolio';
import LandingPage from 'containers/LandingPage';
import { navActions } from 'store/actions';

import styles from './index.css';

ReactGA.initialize('UA-6241825-5'); // initialize Google Analytics

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(value) {
  return {
    opacity: value.opacity,
    // transform: `scale(${styles.scale})`,
  };
}

// child matches will...
const transition = {
  atEnter: {
    opacity: 0,
    // scale: 0.9,
  },
  atLeave: {
    opacity: 0,
    // scale: 0.9,
  },
  atActive: {
    opacity: 1,
    // scale: 1,
  },
};

// const pages = {
//   '/': 0,
//   '/fullstack': 1,
//   '/frontend': 2,
//   '/ux': 3,
//   '/automation': 4
// };

@withRouter
@connect()
export default class Routes extends Component {
  componentDidMount() {
    this.updateAnalytics();
  }

  onRouteChanged() {
    // log page view to Google Analytics
    this.updateAnalytics();

    // scroll to top when changing page
    window.scrollTo(0, 0);

    // close mobile nav
    this.props.dispatch(navActions.closeNav());
  }

  updateAnalytics() {
    const { pathname } = this.props.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);
  }

  render() {
    const switchStyles = cn(styles.switch, {
      [styles.blur]: this.props.contactActive,
    });

    return (
      <AnimatedSwitch
        atEnter={transition.atEnter}
        atLeave={transition.atLeave}
        atActive={transition.atActive}
        mapStyles={mapStyles}
        className={switchStyles}
      >
        <Route path="/" exact component={Index} />
        <Route path="/frontend" component={FrontEnd} />
        <Route path="/fullstack" component={FullStack} />
        <Route path="/ux" component={Ux} />
        <Route path="/automation" component={Automation} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/about" component={About} />
        <Route path="/schedule" component={Schedule} />
        <Route path="/invoice/:id/:token" component={Invoice} />
        <Route path="/estimate/:id/:token" component={Estimate} />
        <Route path="/l/:landingPageUrl" component={LandingPage} />
      </AnimatedSwitch>
    );
  }
}
