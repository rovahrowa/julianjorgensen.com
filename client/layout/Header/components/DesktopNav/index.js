import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Headroom from 'react-headroom';

import Logo from 'components/Logo';
import Contact from '../Contact';
import NavItems from '../NavItems';
import styles from './index.css';

@withRouter
@connect(
  ({ scrollPosition }) => ({
    scroll: scrollPosition.y
  })
)
export default class DesktopNav extends React.Component {
  constructor() {
    super();

    this.state = {
      contactActive: false,
      navStatic: true
    };
  }

  handleContactToggle = () => {
    this.setState({ contactActive: !this.state.contactActive });

    // trigger parent callback
    this.props.onContactToggle();
  };

  handleNavUnpin = () => {
    this.setState({
      navStatic: false
    })
  }

  handleNavUnfix = () => {
    this.setState({
      navStatic: true
    })
  }

  render() {
    let { navStatic, contactActive } = this.state;
    let { dispatch, className } = this.props;
    let pathname = this.props.location.pathname.split('/')[1];

    let _wrapperStyles = cn(className, styles.wrapper);

    let theme;
    switch (pathname) {
      case 'invoice':
      case 'estimate':
        theme = styles.dark
        break;
      case 'frontend':
        theme = styles.dark
        break;
    }

    let headerOpacity = 0 + (scroll.y / 100);

    return (
      <Headroom
         onUnpin={this.handleNavUnpin}
         onUnfix={this.handleNavUnfix}
         upTolerance={1}
         className={_wrapperStyles}
       >
        <header className={`${styles.header} ${theme} ${navStatic ? styles.navStatic : styles.navDefault}`}>
          <NavItems className={styles.nav} />

          <Contact
            active={contactActive}
            handleToggle={this.handleContactToggle}
          />
        </header>
      </Headroom>
    )
  }
}
