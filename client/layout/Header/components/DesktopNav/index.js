import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Headroom from 'react-headroom';

import Logo from 'components/Logo';
import Contact from '../Contact';
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
    let theme;
    switch (pathname) {
      case 'invoice':
      case 'estimate':
        theme = 'dark'
        break;
    }

    let _wrapperStyles = cn(className, styles.wrapper);
    let _headerStyles = cn(styles.header, {
      [styles.dark]: theme === 'dark',
      [styles.navStatic]: navStatic,
      [styles.navDefault]: !navStatic
    });

    let headerOpacity = 0 + (scroll.y / 100);

    return (
      <Headroom
         onUnpin={this.handleNavUnpin}
         onUnfix={this.handleNavUnfix}
         upTolerance={1}
         className={_wrapperStyles}
       >
        <header className={_headerStyles}>
          <div>{ENV_CONFIG.ENV === 'production' ?
          <nav className={styles.nav}>
            <li><div className={styles.logo}><Logo className={pathname === '' ? styles.active : ''} /></div></li>
            <li><div className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</div></li>
            <li><div className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</div></li>
            <li><div className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</div></li>
            <li><div className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Automation</div></li>
            <li><div className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</div></li>
          </nav> : <nav className={styles.nav}>
          <li><Link to='/' className={styles.logo}><Logo className={pathname === '' ? styles.active : ''} /></Link></li>
          <li><Link to='/frontend' className={`${styles.link} ${pathname === 'frontend' ? styles.linkActive : ''}`}>Front-End</Link></li>
          <li><Link to='/fullstack' className={`${styles.link} ${pathname === 'fullstack' ? styles.linkActive : ''}`}>Full Stack</Link></li>
          <li><Link to='/ux' className={`${styles.link} ${pathname === 'ux' ? styles.linkActive : ''}`}>UX</Link></li>
          <li><Link to='/automation' className={`${styles.link} ${pathname === 'automation' ? styles.linkActive : ''}`}>Automation</Link></li>
          <li><div className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</div></li>
        </nav>}
        </div>
          <Contact
            active={contactActive}
            handleToggle={this.handleContactToggle}
          />
        </header>
      </Headroom>
    )
  }
}
