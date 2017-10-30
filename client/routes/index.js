import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import { connect } from 'react-redux';
import cn from 'classnames';
import { ParallaxController } from 'lib/react-scroll-parallax';
import ReactGA from 'react-ga';
ParallaxController.init();

import { navActions } from 'store/actions';
import DocumentMeta from 'react-document-meta';

// layout
import Header from 'layout/Header';
import Footer from 'layout/Footer';

// components
import Faq from 'components/Faq';
import Calendly from 'components/Calendly';
import EstimateForm from 'components/EstimateForm';
import Scroll from 'components/Scroll';

// containers
import Index from 'containers/Index';
import { Invoice, Estimate } from 'containers/Billing';
import About from 'containers/About';
import FullStack from 'containers/FullStack';
import FrontEnd from 'containers/FrontEnd';
import Ux from 'containers/Ux';
import Automation from 'containers/Automation';
import Portfolio from 'containers/Portfolio';
import Proposal from 'containers/Proposal';

import styles from './index.css';

ReactGA.initialize('UA-6241825-5'); // initialize Google Analytics

// site meta data
const meta = {
  title: 'Julian Jorgensen',
  description: 'UX &amp; Front-End Development',
  meta: {
    charset: 'utf-8',
  },
  auto: {
    ograph: true,
  }
};

const pages = {
  '/': 0,
  '/fullstack': 1,
  '/frontend': 2,
  '/ux': 3,
  '/automation': 4
};

@withRouter
@connect()
export default class Routes extends Component {
  constructor(props) {
    super(props);

    this.updateRoutesContainer = this.updateRoutesContainer.bind(this);
  }

  handleModalToggle = () => {
    this.setState({
      modalActive: !this.state.modalActive,
    });
  }

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

  componentDidMount() {
    this.props.dispatch({ type: 'SITE_LOADED' });
  }

  render() {
    const renderMergedProps = (component, ...rest) => {
      const finalProps = Object.assign({}, ...rest);
      return (
        React.createElement(component, finalProps)
      );
    };

    const globalProps = {
      onLoaded: () => console.log('trigger update');
    };

    const PropsRoute = ({ component, ...rest }) => (
      <Route
        {...rest}
        onLoaded={this.updateRoutesContainer}
        render={routeProps => renderMergedProps(component, routeProps, globalProps, rest)}
      />
    );

    const switchStyles = cn(styles.switch, {
      [styles.blur]: this.state.modalActive,
    });

    return (
      <div className={styles.container}>
        <DocumentMeta {...meta} />
        <Header onContactToggle={this.handleModalToggle} />
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
          <PropsRoute path="/invoice/:id/:token" component={Invoice} />
          <PropsRoute path="/estimate/:id/:token" component={Estimate} />
          <PropsRoute path="/p/:prospectName/:proposalId" component={Proposal} />
          <PropsRoute path="/p/:prospectName/:proposalId?env=:environment" component={Proposal} />
        </AnimatedSwitch>

        <div className={styles.footerWrapper}>
          <EstimateForm show={currentKey !== 'invoice' && currentKey !== 'estimate'} />
          <Faq handleUpdate={this.updateRoutesContainer} />
        </div>

        <Footer />
        <Calendly />
      </div>
    );
  }
}
