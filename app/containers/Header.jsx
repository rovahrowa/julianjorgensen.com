import React from 'react';
import {Link, IndexLink} from 'react-router';
let {connect} = require('react-redux');
let cartActions = require('cartActions');

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, cartItems} = this.props;

    return (
      <header id="site-header">
        <div id="site-logo">
          <IndexLink to="/" activeClassName="active" activeStyle={{fontWeight: 'bold'}}><img src="/images/logo.png" /></IndexLink>
        </div>

        <nav id="site-nav">
          <li className="site-nav-item"><Link to="/products" activeClassName="active">Shop</Link></li>
          <li className="site-nav-item"><Link to="/my-city" activeClassName="active">My City</Link></li>
          <li className="site-nav-item"><Link to="/categories" activeClassName="active">Categories</Link></li>
        </nav>
      </header>
    )
  }
}

export default connect(
  (state) => {
    return {
      cartItems: state.cart.lineItemsCount
    }
  }
)(Header);
