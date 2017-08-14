import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import {Link, Element, Events, scroll, scrollSpy} from 'react-scroll';
import styles from './index.css';

@connect(
  ({ scrollPosition }) => ({
    scroll: scrollPosition.y
  })
)
export default class Marquee extends React.Component {
  constructor(){
    super();

    // this.state = {
    //   headerMarginBottom: 0,
    //   headerOpacity: 0.2
    // }
  }

  render() {
    let {title, bgColor, scroll} = this.props;

    let headerMarginBottom = -scroll;
    let headerOpacity = 0.2-(scroll/600);

    return (
      <div className={`${styles.marquee} ${styles[bgColor]}`}>
        <h1 className={styles.header} style={{marginBottom: headerMarginBottom, opacity: headerOpacity}}>{title}</h1>
      </div>
    )
  }
}
