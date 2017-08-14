import React from 'react';
import { BrowserRouter as Router, Route, HashRouter, Link } from 'react-router-dom';

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
import FrontEnd from 'routes/FrontEnd';
import BackEnd from 'routes/BackEnd';
import UiUx from 'routes/UiUx';
import Automation from 'routes/Automation';
import Portfolio from 'routes/Portfolio';
import Proposal from 'routes/Proposal';
//
import { Layout } from 'react-toolbox/lib/layout';

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

export default (
  <Router>
    <div>
      <Scroll />
      <DocumentMeta {...meta} />
      <Header />
      <scrollPosition />
      <Layout className={styles.main}>
        <Route exact path="/" component={Index} />
        <Route path="/frontend" component={FrontEnd} />
        <Route path="/uiux" component={UiUx} />
        <Route path="/backend" component={BackEnd} />
        <Route path="/automation" component={Automation} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/about" component={About} />
        {/* <Route path="/invoice/:id" component={Invoice} /> */}
        <Route path="/p/:prospectName/:proposalId" component={Proposal} />
        <Route path="/p/:prospectName/:proposalId?env=:environment" component={Proposal} />

        <EstimateForm />
        <Faq />
        <Footer />
        <Calendly />
      </Layout>
    </div>
  </Router>
);
