import React from 'react';
import Waypoint from 'react-waypoint';
import {Link, Element, Events, scroll, scrollSpy} from 'react-scroll';
import styles from './Marquee.css';

class Header extends React.Component {
  constructor(){
    super();

    this.state = {
      headerMarginBottom: 0,
      headerOpacity: 0.2
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', () =>{
      let supportPageOffset = window.pageXOffset !== undefined;
      let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
      let scroll = {
         x: supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft,
         y: supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      };

      this.setState({
        headerMarginBottom: -scroll.y,
        headerOpacity: 0.2-(scroll.y/600)
      });
    }, 300);//ms
  }

  render() {
    let {title, bgColor} = this.props;

    return (
      <div className={`${styles.marquee} ${styles[bgColor]}`}>
        <h1 className={styles.header} style={{marginBottom: this.state.headerMarginBottom, opacity: this.state.headerOpacity}}>{title}</h1>
      </div>
    )
  }
}

module.exports = Header;
