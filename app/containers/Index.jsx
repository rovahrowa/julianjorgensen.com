import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let actions = require('cartActions');

import Loader from 'Loader';
import ProductItem from 'ProductItem';

class Index extends React.Component {
  constructor() {
    super();
  }

  handleAddToCart(product) {
    let {dispatch} = this.props;
    dispatch(actions.startAddorUpdateCartItem(product.selectedVariant, 1));
  }

  render() {
    let {products} = this.props;
    products = products.slice(0, 12);

    if (products.length > 0) {
      return (
        <div>
          <div className="homepage-hero"></div>
          <div className="container">
            <div className="products-grid">
              {products.map(product => {
                return <ProductItem key={product.key} addToCart={() => this.handleAddToCart(product)} id={product.attrs.product_id} title={product.attrs.title} image={product.selectedVariant.imageVariants[5].src} />
              })}
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <Loader />
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      products: state.products.all
    }
  }
)(Index);
