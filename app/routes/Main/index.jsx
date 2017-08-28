import React from 'react';
import { BrowserRouter as Router, Route, matchPath, HashRouter, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ParallaxController } from 'react-scroll-parallax';
ParallaxController.init();

import DocumentMeta from 'react-document-meta';

// layout
import Header from 'layout/Header';
import Footer from 'layout/Footer';

// components
import Faq from 'components/Faq';
import Calendly from 'components/Calendly';
import EstimateForm from 'components/EstimateForm';
import Scroll from 'components/Scroll';

// routes
import Index from 'routes/Index';
import Invoice from 'routes/Invoice';
import About from 'routes/About';
import FullStack from 'routes/FullStack';
import FrontEnd from 'routes/FrontEnd';
import Ux from 'routes/Ux';
import Automation from 'routes/Automation';
import Portfolio from 'routes/Portfolio';
import Proposal from 'routes/Proposal';
//
import { Layout } from 'react-toolbox/lib/layout';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './index.css';

import ReactGA from 'react-ga';
// ReactGA.initialize('UA-6241825-9'); // initialize Google Analytics

function logPageView(location) {
  // ReactGA.set({ page: location.pathname });
  // ReactGA.pageview(location.pathname);
}

// browserHistory.listen((location) => {
//   logPageView(location);
//
//   // scroll to top when changing page
//   window.scrollTo(0, 0);
// });

// site meta data
const meta = {
  title: 'Julian Jorgensen',
  description: 'UX &amp; Front-End Development',
  meta: {
    charset: 'utf-8'
  },
  auto: {
    ograph: true
  }
};

let pages = {
  '/': 0,
  '/fullstack': 1,
  '/frontend': 2,
  '/ux': 3,
  '/automation': 4
}

@withRouter
@connect()
export default class Routes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentHeight: 0,
      direction: null
    }
  }

  getDirection = (prevPage) => {
    console.log('prev location', prevPage);
    let currentPage = this.props.location.pathname;
    let currentPageIndex = pages[currentPage];
    let prevPageIndex = pages[prevPage];
    let direction;

    console.log('prev page: ', prevPage);
    console.log('prevPageIndex', prevPageIndex);

    console.log('current page: ', currentPage);
    console.log('currentPageIndex', currentPageIndex);

    if (prevPageIndex < currentPageIndex) {
      direction = 'right'
    } else if (prevPageIndex > currentPageIndex) {
      direction = 'left'
    }

    console.log('setting direction to: ', direction);
    this.setState({
      direction
    })
  }

  getAnimationClasses() {
    let { direction } = this.state;
    direction = 'right';
    console.log('returning animation classes', direction);
    return {
      enter: `fade-${direction}-enter`,
      enterActive: `fade-${direction}-enter-active`,
      exit: `fade-${direction}-exit`,
      exitActive: `fade-${direction}-exit-active`
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();

      this.getDirection(prevProps.location.pathname);
    }
  }

  onRouteChanged() {
    // log page view to Google Analytics
    // logPageView(location);

    // scroll to top when changing page
    window.scrollTo(0, 0);
  }

  handleRoutesContainer = (ref) => {
    if (ref){
      // set client height 200ms after page is loaded (could possibly be more elegant or faster)
      // this ensures all elements, sliders in particular, have been loaded!
      // if this is not set, then Body will never have the correct height, causing a lot of issues with scroll events and components
      setTimeout(() => {
        this.setState({
          contentHeight: ref.clientHeight
        });
      }, 200);
    }
  }

  render() {
    let { direction } = this.state;
    let { location } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 400, exit: 400 };

    return (
      <div className={styles.container}>
        <DocumentMeta {...meta} />
        <Header />

        <Layout>
          <TransitionGroup component="main" className={styles.animatedRoutes} style={{height: this.state.contentHeight}}>
            <CSSTransition key={currentKey} timeout={timeout} classNames={this.getAnimationClasses()}>
              <div className={styles.animatedRoutesInner} ref={this.handleRoutesContainer}>
                <Switch location={location}>
                  <Route path="/" exact component={Index} />
                  <Route path="/fullstack" component={FullStack} />
                  <Route path="/frontend" component={FrontEnd} />
                  <Route path="/ux" component={Ux} />
                  <Route path="/automation" component={Automation} />
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/about" component={About} />
                  <Route path="/invoice/:id/:token" component={Invoice} />
                  <Route path="/p/:prospectName/:proposalId" component={Proposal} />
                  <Route path="/p/:prospectName/:proposalId?env=:environment" component={Proposal} />
                </Switch>

                <EstimateForm />
                <Faq />
                <Footer />
              </div>
            </CSSTransition>
          </TransitionGroup>

          <Calendly />
        </Layout>
        <Scroll />
      </div>
    )
  }
};
