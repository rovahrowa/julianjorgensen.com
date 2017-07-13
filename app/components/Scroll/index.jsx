import React from 'react';
let {connect} = require('react-redux');
let store = require('configureStore').configure();

class Scroll extends React.Component {
  constructor(){
    super();
  }

  componentDidMount(){
    window.addEventListener('scroll', () => {
      let supportPageOffset = window.pageXOffset !== undefined;
      let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
      let scroll = {
         x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
         y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      };

      let scrollY = scroll.y;

      this.props.dispatch({ type: 'SET_SCROLL_POSITION', scrollY });
    }, 300);
  }

  render(){
    let {scroll} = this.props;
    return (
      <div></div>
    )
  }
}

export default connect(
  (state) => {
    return {
      scroll: state.scrollPosition
    }
  }
)(Scroll);
