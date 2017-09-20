import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
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
    let {title, className, scroll} = this.props;

    const _wrapperStyles = cn(className, styles.wrapper);  

    let headerMarginBottom = -scroll;
    let headerOpacity = 0.08-(scroll/1000);

    return (
      <div className={_wrapperStyles}>
        <div className={styles.blocks}></div>
        <div className={styles.marquee} style={{opacity: headerOpacity}}>
          <h1 className={styles.header} style={{marginBottom: headerMarginBottom}}>{title}</h1>
        </div>
        <div className={styles.blocks2}></div>          
      </div>
    )
  }
}
