import React from 'react';
import {Link, IndexLink} from 'react-router';
let {connect} = require('react-redux');

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch} = this.props;

    return (
      <header id="site-header">
        <div id="site-logo">
          <IndexLink to="/" activeClassName="active">Logo</IndexLink>
        </div>

        <nav id="site-nav">
          <li className="site-nav-item"><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li className="site-nav-item"><Link to="/about" activeClassName="active">About</Link></li>
          <li className="site-nav-item"><Link to="/contact" activeClassName="active">Contact</Link></li>
        </nav>
      </header>
    )
  }
}

export default connect(
  (state) => {
  }
)(Header);
