import React from 'react';
import { HashLink } from 'lib/react-router-hash-link';
import { Link, withRouter } from 'react-router-dom';
import cn from 'classnames';
import { connect } from 'react-redux';
import Headroom from 'react-headroom';
import Logo from 'components/Logo';
import Contact from '../Contact';
import styles from './index.css';

@withRouter
@connect(({ scrollPosition }) => ({
  scroll: scrollPosition.y,
}))
export default class DesktopNav extends React.Component {
  constructor() {
    super();

    this.state = {
      contactActive: false,
      navStatic: true,
    };
  }

  handleContactToggle = () => {
    this.setState({ contactActive: !this.state.contactActive });

    // trigger parent callback
    this.props.onContactToggle();
  };

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
    const { navStatic, contactActive } = this.state;
    const { className } = this.props;
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

    const wrapperStyles = cn(className, styles.wrapper);
    const headerStyles = cn(styles.header, {
      [styles.dark]: theme === 'dark',
      [styles.navStatic]: navStatic,
      [styles.navDefault]: !navStatic,
    });

    return (
      <div className={wrapperStyles}>
        <Headroom
          onUnpin={this.handleNavUnpin}
          onUnfix={this.handleNavUnfix}
          upTolerance={1}
        >
          <header className={headerStyles}>
            <nav className={styles.nav}>
              <li><HashLink to="/" className={styles.logo}><Logo className={pathname === '' ? styles.active : ''} /></HashLink></li>
              <li><HashLink to="/#details" className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</HashLink></li>
              <li><HashLink to="/#ux" className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</HashLink></li>
              <li><HashLink to="/#fullstack" className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</HashLink></li>
              <li><HashLink to="/#automation" className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Automation</HashLink></li>
              <li><button className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</button></li>
            </nav>
            <Contact
              active={contactActive}
              handleToggle={this.handleContactToggle}
            />
          </header>
        </Headroom>
      </div>
    );
  }
}
