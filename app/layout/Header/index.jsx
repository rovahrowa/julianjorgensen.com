import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Headroom from 'react-headroom';
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
      contactActive: false,
      navStatic: true
    };
  }

  handleContactToggle = () => {
    this.setState({contactActive: !this.state.contactActive});
  };

  handleNavUnpin = () => {
    this.setState({
      navStatic: false
    })
  }

  handleNavUnfix =() => {
    this.setState({
      navStatic: true
    })
  }

  render() {
    let { navStatic } = this.state;
    let { dispatch } = this.props;
    let { pathname } = this.props.location;

    let bgColor;
    let logoColor = 'white';
    switch(pathname) {
      case '/frontend':
        bgColor = styles.dark
        logoColor = 'black'
        break;
    }

    let headerOpacity = 0+(scroll.y/100);

    return (
      <Headroom
         onUnpin={this.handleNavUnpin}
         onUnfix={this.handleNavUnfix}
        //  wrapperStyle={{backgroundColor: 'transparent', position: 'absolute', width: '100%'}}
         className={styles.headroom}
       >
        <header className={`${styles.header} ${bgColor} ${navStatic ? styles.navStatic : styles.navDefault}`}>
          <nav className={styles.nav}>
            <li><Link to='/' className={styles.link}><Logo size={25} color={logoColor} className={`${styles.logo} ${pathname === '/' ? styles.active : ''}`} /></Link></li>
            <li><Link to='/fullstack' className={`${styles.link} ${pathname === '/fullstack' ? styles.linkActive : ''}`}>Full Stack</Link></li>
            <li><Link to='/frontend' className={`${styles.link} ${pathname === '/frontend' ? styles.linkActive : ''}`}>Front-End</Link></li>
            <li><Link to='/ux' className={`${styles.link} ${pathname === '/ux' ? styles.linkActive : ''}`}>UX</Link></li>
            <li><Link to='/automation' className={`${styles.link} ${pathname === '/automation' ? styles.linkActive : ''}`}>Automation</Link></li>
            <li><Link to='#' className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</Link></li>
          </nav>

          <Drawer theme={theme} active={this.state.contactActive} onOverlayClick={this.handleContactToggle} className={theme.contact}>
            <h4>me@julianjorgensen.com</h4>
          </Drawer>
        </header>
      </Headroom>
    )
  }
}
