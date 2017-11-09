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
import Proposal from 'containers/Proposal';
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
  onRouteChanged() {
    // log page view to Google Analytics
    const { pathname } = this.props.location;
    ReactGA.set({ page: pathname });
    ReactGA.pageview(pathname);  

    // scroll to top when changing page
    window.scrollTo(0, 0);

    // close mobile nav
    this.props.dispatch(navActions.closeNav());
  }

  render() {
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (
        React.createElement(component, finalProps)
      );
    };

    const globalProps = {
      onLoaded: () => console.log('trigger update'),
    };

    const PropsRoute = ({ component, ...rest }) => (
      <Route
        {...rest}
        render={routeProps => renderMergedProps(component, routeProps, globalProps, rest)}
      />
    );

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
        <PropsRoute path="/" exact component={Index} />
        <PropsRoute path="/frontend" component={FrontEnd} />
        <PropsRoute path="/fullstack" component={FullStack} />
        <PropsRoute path="/ux" component={Ux} />
        <PropsRoute path="/automation" component={Automation} />
        <PropsRoute path="/portfolio" component={Portfolio} />
        <PropsRoute path="/about" component={About} />
        <PropsRoute path="/schedule" component={Schedule} />
        <PropsRoute path="/invoice/:id/:token" component={Invoice} />
        <PropsRoute path="/estimate/:id/:token" component={Estimate} />
        <PropsRoute path="/p/:prospectName/:proposalId" component={Proposal} />
        <PropsRoute path="/p/:prospectName/:proposalId?env=:environment" component={Proposal} />
      </AnimatedSwitch>
    );
  }
}
