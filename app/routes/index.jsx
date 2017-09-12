import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  matchPath,
  HashRouter,
  Link,
  Switch,
  withRouter
} from 'react-router-dom';
import {
  connect
} from 'react-redux';
import {
  ParallaxController
} from 'react-scroll-parallax';
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

// containers
import Index from 'containers/Index';
import {
  Invoice,
  Estimate
} from 'containers/Billing';
import About from 'containers/About';
import FullStack from 'containers/FullStack';
import FrontEnd from 'containers/FrontEnd';
import Ux from 'containers/Ux';
import Automation from 'containers/Automation';
import Portfolio from 'containers/Portfolio';
import Proposal from 'containers/Proposal';

import {
  Layout
} from 'react-toolbox/lib/layout';

import {
  TransitionGroup,
  CSSTransition
} from 'react-transition-group';
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

    this.routesContainer = null;
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
    let {
      direction
    } = this.state;
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
    // window.scrollTo(0, 0);
  }

  updateRoutesContainer = () => {
    console.log('updating content height based on routescontainer ref', this.routesContainer);
    this.setState({
      contentHeight: this.routesContainer.clientHeight
    });
  };

  componentDidMount() {
    this.updateRoutesContainer();
  }

  render() {
    let {
      direction
    } = this.state;
    let {
      location
    } = this.props;
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = {
      enter: 400,
      exit: 400
    };

    return (
      <div className={styles.container}>
        <DocumentMeta {...meta} />
        <Header />

        <Layout>
          <TransitionGroup component="main" className={styles.animatedRoutes} style={{height: this.state.contentHeight}}>
            <CSSTransition key={currentKey} timeout={timeout} classNames={this.getAnimationClasses()}>
              <div className={styles.animatedRoutesInner} ref={(el) => { this.routesContainer = el; }}>
                <Switch location={location}>
                  <Route path="/" exact component={Index} />
                  <Route path="/fullstack" component={FullStack} />
                  <Route path="/frontend" component={FrontEnd} />
                  <Route path="/ux" component={Ux} />
                  <Route path="/automation" component={Automation} />
                  <Route path="/portfolio" component={Portfolio} />
                  <Route path="/about" component={About} />
                  <Route path='/invoice/:id/:token' render={(props)=><Invoice {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path="/estimate/:id/:token" render={(props)=><Estimate {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path="/p/:prospectName/:proposalId" component={Proposal} />
                  <Route path="/p/:prospectName/:proposalId?env=:environment" component={Proposal} />
                </Switch>

                <EstimateForm show={currentKey !== 'invoice' && currentKey !== 'estimate'} />
                <Faq handleUpdate={this.updateRoutesContainer} />
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
