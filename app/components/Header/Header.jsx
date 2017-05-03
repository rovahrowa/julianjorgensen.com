import React from 'react';
import {Link, IndexLink} from 'react-router';
let {connect} = require('react-redux');

import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import styles from './Header.css';
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
    let {dispatch} = this.props;

    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <li><IndexLink to="/" activeClassName="active"><img src="/images/julian-jorgensen-logo.svg" width={24} /></IndexLink></li>
          <li><Link to='/design'>Design</Link></li>
          <li><Link to='/frontend'>Front-end</Link></li>
          <li><Link onClick={this.handleContactToggle}>Contact</Link></li>
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
  }
)(Header);
