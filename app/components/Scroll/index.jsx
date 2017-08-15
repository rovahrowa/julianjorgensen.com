import React from 'react';
import { connect } from 'react-redux';
import store from 'store';

@connect(
  ({ scrollPosition }) => ({
    scroll: scrollPosition.y
  })
)
export default class Scroll extends React.Component {
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