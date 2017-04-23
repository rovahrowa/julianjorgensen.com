import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';
let {connect} = require('react-redux');
let store = require('configureStore').configure();

import DocumentMeta from 'react-document-meta';
import Main from 'Main';
import Index from 'Index/Index';
import Invoice from 'Invoice/Invoice';
import About from 'About/About';
import FrontEnd from 'FrontEnd/FrontEnd';
import Design from 'Design/Design';
import Proposal from 'Proposal/Proposal';

import ReactGA from 'react-ga';
// ReactGA.initialize('UA-6241825-9'); // initialize Google Analytics

function logPageView(location) {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
}

browserHistory.listen((location) => {
  logPageView(location);

  // scroll to top when changing page
  window.scrollTo(0, 0);
});

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute path="/" component={Index} />
      <Route path="invoice/:id" component={Invoice} />
      <Route path="design" component={Design} />
      <Route path="frontend" component={FrontEnd} />
      <Route path="about" component={About} />
      <Route path="p/:prospectName/:proposalId" component={Proposal} />
      <Route path="p/:prospectName/:proposalId/:environment" component={Proposal} />
    </Route>
  </Router>
);
