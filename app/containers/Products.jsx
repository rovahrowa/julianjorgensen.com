import React from 'react';
let {connect} = require('react-redux');
let actions = require('cartActions');
import Loader from 'Loader';
import ProductItem from 'ProductItem';

class Products extends React.Component {
  constructor() {
    super();
  }

  handleAddToCart(product) {
    let {dispatch} = this.props;
    dispatch(actions.startAddorUpdateCartItem(product.selectedVariant, 1));
  }

  render() {
    let {products} = this.props;

    if (products.length > 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="small-12 column">
              <div className="products-grid">
                {products.map(product => {
                  return <ProductItem key={product.key} addToCart={() => this.handleAddToCart(product)} id={product.attrs.product_id} title={product.attrs.title} image={product.selectedVariant.imageVariants[4].src} />
                })}
              </div>
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
)(Products);
