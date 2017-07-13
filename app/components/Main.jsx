import React from 'react';
import {BrowserRouter as Router, Route, HashRouter, Link} from 'react-router-dom';

import DocumentMeta from 'react-document-meta';
import Main from 'Main';
import Index from 'Index/Index';
import Header from 'Header/Header';
import Faq from 'Faq/Faq';
import Footer from 'Footer/Footer';
import Invoice from 'Invoice/Invoice';
import About from 'About/About';
import FrontEnd from 'FrontEnd/FrontEnd';
import Design from 'Design/Design';
import Automation from 'Automation/Automation';
import Portfolio from 'Portfolio/Portfolio';
import Proposal from 'Proposal/Proposal';
import Calendly from 'Calendly/Calendly';
import EstimateForm from 'EstimateForm/EstimateForm';

import Scroll from 'Scroll';

import { Layout } from 'react-toolbox/lib/layout';
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
    <div id="main" className={`page-name-here`}>
      <Scroll />
      <DocumentMeta {...meta} />
      <Header />
      <scrollPosition />
      <Route path="/" component={Main} />
      <Layout>
        <Route exact path="/" component={Index} />
        <Route path="/invoice/:id" component={Invoice} />
        <Route path="/design" component={Design} />
        <Route path="/frontend" component={FrontEnd} />
        <Route path="/automation" component={Automation} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/about" component={About} />
        <Route path="/p/:prospectName/:proposalId" component={Proposal} />
        <Route path="/p/:prospectName/:proposalId?env=:environment" component={Proposal} />
        <EstimateForm />
        <Faq />
        <Footer />
      </Layout>
      <Calendly />
    </div>
  </Router>
);
