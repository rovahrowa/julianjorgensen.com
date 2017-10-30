import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
      <Headroom
        onUnpin={this.handleNavUnpin}
        onUnfix={this.handleNavUnfix}
        upTolerance={1}
        className={wrapperStyles}
      >
        <header className={headerStyles}>
          <nav className={styles.nav}>
            <li><div className={styles.logo}><Logo className={pathname === '' ? styles.active : ''} /></div></li>
            <li><div className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</div></li>
            <li><div className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</div></li>
            <li><div className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</div></li>
            <li><div className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Automation</div></li>
            <li><button className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</button></li>
          </nav>
          <Contact
            active={contactActive}
            handleToggle={this.handleContactToggle}
          />
        </header>
      </Headroom>
    );
  }
}
