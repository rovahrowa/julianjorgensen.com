import React from 'react';
let {connect} = require('react-redux');
import {Link} from 'react-router-dom';

import Logo from 'components/Logo';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';

import styles from './index.css';
import theme from 'styles/theme/topDrawer.css';

class Header extends React.Component {
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
    let {dispatch, pageName, scroll} = this.props;

    let navStyle;
    switch(pageName) {
      case 'design':
      case 'frontend':
        navStyle = styles.navDark
        break;
    }

    let headerOpacity = 0+(scroll.y/100);

    return (
      <header className={styles.header}>
        <nav className={`${styles.nav} ${navStyle}`}>
          <li><Link to='/' className={`${styles.link} ${styles.logo}`}><Logo fill='#ffffff' width={24} /></Link></li>
          <li><Link to='/design' className={styles.link} activeClassName={styles.linkActive}>Design</Link></li>
          <li><Link to='/frontend' className={styles.link} activeClassName={styles.linkActive}>Front-end</Link></li>
          <li><Link to='/automation' className={styles.link} activeClassName={styles.linkActive}>Automation</Link></li>
          <li><Link to='/portfolio' className={styles.link} activeClassName={styles.linkActive}>Portfolio</Link></li>
          <li><Link to='#' className={`${styles.link} ${styles.contact}`} onClick={this.handleContactToggle}>Contact</Link></li>
        </nav>

        <Drawer theme={theme} active={this.state.contactActive} onOverlayClick={this.handleContactToggle} className={theme.contact}>
          <h4>me@julianjorgensen.com</h4>
        </Drawer>
      </header>
    )
  }
}

export default connect(
  (state) => {
    return {
      scroll: state.scrollPosition
    }
  }
)(Header);
