import React from 'react';
import { BrowserRouter as Router, Route, matchPath, HashRouter, Link, Switch, withRouter } from 'react-router-dom';

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

@withRouter
export default class Routes extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // log page view to Google Analytics
    // logPageView(location);

    // scroll to top when changing page
    window.scrollTo(0, 0);
  }

  render() {
    let { location } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 300, exit: 200 };

    return (
      <div className={styles.container}>

        <Scroll />
        <DocumentMeta {...meta} />
        <Header />
        <scrollPosition />

        <Layout>
          <TransitionGroup component="main" className={styles.animatedRoutes}>
            <CSSTransition key={currentKey} timeout={timeout} classNames="fade" appear>
              <section className={styles.animatedRoutesInner}>
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

                <div className={styles.footer}>
                  <EstimateForm />
                  <Faq />
                  <Footer />
                </div>
              </section>
            </CSSTransition>
          </TransitionGroup>

          <Calendly />
        </Layout>
      </div>
    )
  }
};
