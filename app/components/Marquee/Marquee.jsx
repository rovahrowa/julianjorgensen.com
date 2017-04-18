import React from 'react';
import styles from './Marquee.css';

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {title, bgColor} = this.props;

    return (
      <div className={styles.marquee} style={{backgroundColor: bgColor}}>
        <h1>{title}</h1>
      </div>
    )
  }
}

module.exports = Header;
