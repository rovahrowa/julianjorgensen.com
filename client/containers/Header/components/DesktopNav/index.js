import React from 'react';
import { connect } from 'react-redux';
import { HashLink } from 'lib/react-router-hash-link';
import { Link, withRouter } from 'react-router-dom';
import { navActions } from 'actions';
import cn from 'classnames';
import Headroom from 'react-headroom';
import Logo from 'components/Logo';
import Contact from '../Contact';
import styles from './index.css';

@withRouter
@connect(({ site }) => ({
  site,
}))
export default class DesktopNav extends React.Component {
  constructor() {
    super();

    this.state = {
      navStatic: true,
    };
  }

  handleContactToggle = () => {
    const { dispatch } = this.props;
    dispatch(navActions.toggleContact());
  };

  handleScheduleToggle = () => {
    this.handleContactToggle();

    const { dispatch } = this.props;
    dispatch(navActions.toggleScheduling());
  }

  handleNavUnpin = () => {
    this.setState({
      navStatic: false,
    });
  }

  handleNavUnfix = () => {
    this.setState({
      navStatic: true,
    });
  }

  render() {
    const { site } = this.props;
    const { navStatic } = this.state;
    const pathname = this.props.location.pathname.split('/')[1];
    let theme;
    switch (pathname) {
      case 'invoice':
      case 'estimate':
      case 'schedule':
        theme = 'dark';
        break;
      default:
        theme = 'light';
    }

    const headerStyles = cn(styles.header, {
      [styles.dark]: theme === 'dark',
      [styles.navStatic]: navStatic,
      [styles.navDefault]: !navStatic,
    });

    return (
      <Headroom
        onUnpin={this.handleNavUnpin}
        onUnfix={this.handleNavUnfix}
        upTolerance={2}
        pinStart={window.innerHeight}
        className={styles.headroom}
      >
        <header className={headerStyles}>
          <nav className={styles.nav}>
            <li><HashLink to="/" className={styles.logo}><Logo className={pathname === '' ? styles.active : ''} /></HashLink></li>
            <li><HashLink to="/#details" className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</HashLink></li>
            <li><HashLink to="/#ux" className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</HashLink></li>
            <li><HashLink to="/#fullstack" className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</HashLink></li>
            <li><HashLink to="/#automation" className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Web Automation</HashLink></li>
            <li><button className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</button></li>
          </nav>
          <Contact
            active={site.showContact || false}
            handleToggle={this.handleContactToggle}
            handleScheduleToggle={this.handleScheduleToggle}
          />
        </header>
      </Headroom>
    );
  }
}
