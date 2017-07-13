import React from 'react';
let {connect} = require('react-redux');
import Waypoint from 'react-waypoint';
import {Link, Element, Events, scroll, scrollSpy} from 'react-scroll';
import styles from './Marquee.css';

class Marquee extends React.Component {
  constructor(){
    super();

    // this.state = {
    //   headerMarginBottom: 0,
    //   headerOpacity: 0.2
    // }
  }

  render() {
    let {title, bgColor, scroll} = this.props;

    console.log('scroll prop: ', scroll);
    let headerMarginBottom = -scroll.y;
    let headerOpacity = 0.2-(scroll.y/600);

    return (
      <div className={`${styles.marquee} ${styles[bgColor]}`}>
        <h1 className={styles.header} style={{marginBottom: headerMarginBottom, opacity: headerOpacity}}>{title}</h1>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      scroll: state.scrollPosition
    }
  }
)(Marquee);
