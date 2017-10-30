import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(({ scrollPosition }) => ({
  scroll: scrollPosition.y,
}))
export default class Scroll extends Component {
  componentDidMount() {
    window.addEventListener('scroll', () => {
      const supportPageOffset = window.pageXOffset !== undefined;
      const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
      const scroll = {
        x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
        y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop,
      };

      const scrollY = scroll.y;

      this.props.dispatch({ type: 'SET_SCROLL_POSITION', scrollY });
    }, 300);
  }

  render() {
    return (
      <div></div>
    )
  }
}
