import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Drawer from 'react-toolbox/lib/drawer';

import Logo from 'components/Logo';
import styles from './index.css';
import theme from 'styles/theme/topDrawer.css';

@withRouter
@connect(
  ({ scrollPosition }) => ({
    scroll: scrollPosition.y
  })
)
export default class Header extends React.Component {
  constructor(){
    super();

    this.state = {
      contactActive: false
    };
  }

  handleContactToggle = () => {
    this.setState({contactActive: !this.state.contactActive});
  };

  render() {
    let { dispatch } = this.props;
    let { pathname } = this.props.location;

    let navStyle;
    let logoColor = 'white';
    switch(pathname) {
      case '/frontend':
        navStyle = styles.navDark
        logoColor = 'black'
        break;
    }

    let headerOpacity = 0+(scroll.y/100);

    return (
      <header className={styles.header}>
        <nav className={`${styles.nav} ${navStyle}`}>
          <li><Link to='/' className={styles.link}><Logo size={25} color={logoColor} className={`${styles.logo} ${pathname === '/' ? styles.active : ''}`} /></Link></li>
          <li><Link to='/frontend' className={`${styles.link} ${pathname === '/frontend' ? styles.linkActive : ''}`}>Front-End</Link></li>
          <li><Link to='/uiux' className={`${styles.link} ${pathname === '/uiux' ? styles.linkActive : ''}`}>UI & UX</Link></li>
          <li><Link to='/backend' className={`${styles.link} ${pathname === '/backend' ? styles.linkActive : ''}`}>Back-End</Link></li>
          <li><Link to='/automation' className={`${styles.link} ${pathname === '/automation' ? styles.linkActive : ''}`}>Automation</Link></li>
          <li><Link to='#' className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</Link></li>
        </nav>

        <Drawer theme={theme} active={this.state.contactActive} onOverlayClick={this.handleContactToggle} className={theme.contact}>
          <h4>me@julianjorgensen.com</h4>
        </Drawer>
      </header>
    )
  }
}
