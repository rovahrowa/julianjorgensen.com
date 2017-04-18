import React from 'react';
import {Link, IndexLink} from 'react-router';
let {connect} = require('react-redux');

import Drawer from 'react-toolbox/lib/drawer';
import Button from 'react-toolbox/lib/button';
import styles from './Header.css';

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
          <li><IndexLink to="/" activeClassName="active">Logo</IndexLink></li>
          <li><Link to='/design'>Design</Link></li>
          <li><Link to='/frontend'>Front-end</Link></li>
          <li><Link onClick={this.handleContactToggle}>Contact</Link></li>
        </nav>

        <Drawer active={this.state.contactActive} onOverlayClick={this.handleContactToggle} className={styles.contact}>
          <h5>Contact me</h5>
        </Drawer>
      </header>
    )
  }
}

export default connect(
  (state) => {
  }
)(Header);
