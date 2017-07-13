import React from 'react';
let {connect} = require('react-redux');
import {Link} from 'react-router-dom';

import Logo from '../Logo';
import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import headerStyles from './Header.css';
import navStyles from './Nav.css';
import theme from '../../styles/theme/topDrawer.css';

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
        navStyle = navStyles.navDark
        break;
    }

    let headerOpacity = 0+(scroll.y/100);

    return (
      <header className={headerStyles.header}>
        <nav className={`${navStyles.nav} ${navStyle}`}>
          <li><Link to='/' className={`${navStyles.link} ${navStyles.logo}`}><Logo fill='#ffffff' width={24} /></Link></li>
          <li><Link to='/design' className={navStyles.link} activeClassName={navStyles.linkActive}>Design</Link></li>
          <li><Link to='/frontend' className={navStyles.link} activeClassName={navStyles.linkActive}>Front-end</Link></li>
          <li><Link to='/automation' className={navStyles.link} activeClassName={navStyles.linkActive}>Automation</Link></li>
          <li><Link to='/portfolio' className={navStyles.link} activeClassName={navStyles.linkActive}>Portfolio</Link></li>
          <li><Link to='#' className={`${navStyles.link} ${navStyles.contact}`} onClick={this.handleContactToggle}>Contact</Link></li>
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
