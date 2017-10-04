import React from 'react';
import { BrowserRouter as Router, Route, matchPath, HashRouter, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import cn from 'classnames';
import { ParallaxController } from 'lib/react-scroll-parallax';
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

    this.updateRoutesContainer = this.updateRoutesContainer.bind(this);
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

  updateRoutesContainer = () => {
    const routesContainerHeight = document.getElementById('routesContainer').clientHeight;
    console.log('updating content height based on routescontainer height', routesContainerHeight);
    if (routesContainerHeight) {
      this.setState({
        contentHeight: routesContainerHeight
      });
    }
  }

  handleModalToggle = () => {
    this.setState({
      modalActive: !this.state.modalActive
    });
  }

  onRouteChanged() {
    // log page view to Google Analytics
    // logPageView(location);

    // scroll to top when changing page
    window.scrollTo(0, 0);

    // close mobile nav
    this.props.dispatch(navActions.closeNav());

    // update routes container
    this.updateRoutesContainer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();

      this.getDirection(prevProps.location.pathname);
    }
  }

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

    const _routesContainerStyles = cn(styles.routesContainer, {
      [styles.homepage]: currentKey === '/'
    });

    const _layoutStyles = cn(styles.layout, {
      [styles.blur]: this.state.modalActive
    });

    return (
      <div className={styles.container}>
        <DocumentMeta {...meta} />
        <Header onContactToggle={this.handleModalToggle} />

        <Layout className={_layoutStyles}>
          <TransitionGroup component="main" className={styles.animatedRoutes} style={{height: this.state.contentHeight}}>
            <CSSTransition key={currentKey} timeout={timeout} classNames={this.getAnimationClasses()}>
              <div className={_routesContainerStyles} id='routesContainer'>
                <Switch location={location}>
                  <Route path='/' exact render={(props)=><Index {...props} onLoaded={this.updateRoutesContainer} />} />                  
                  <Route path='/fullstack' render={(props)=><FullStack {...props} onLoaded={this.updateRoutesContainer} />} />                  
                  <Route path='/frontend' render={(props)=><FrontEnd {...props} onLoaded={this.updateRoutesContainer} />} />                  
                  <Route path='/ux' render={(props)=><Ux {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path='/automation' render={(props)=><Automation {...props} onLoaded={this.updateRoutesContainer} />} /> 
                  <Route path='/portfolio' render={(props)=><Portfolio {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path='/about' render={(props)=><About {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path='/invoice/:id/:token' render={(props)=><Invoice {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path="/estimate/:id/:token" render={(props)=><Estimate {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path="/p/:prospectName/:proposalId" render={(props)=><Proposal {...props} onLoaded={this.updateRoutesContainer} />} />
                  <Route path="/p/:prospectName/:proposalId?env=:environment" render={(props)=><Proposal {...props} onLoaded={this.updateRoutesContainer} />} />
                </Switch>

                <div className={styles.footerWrapper}>
                  <EstimateForm show={currentKey !== 'invoice' && currentKey !== 'estimate'} />
                  <Faq handleUpdate={this.updateRoutesContainer} />
                </div>

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
