import React, { Component } from 'react';
import Marquee from 'components/Marquee';
import styles from './index.css';

export default class FrontEnd extends Component{
  render() {
    return (
      <div className={styles.wrapper}>
        <Marquee title="Front-End" className={styles.marquee} />

        <div className={styles.subNav}>
          content here
        </div>

        <div className={styles.container}>
          naked content here
        </div>
      </div>
    );
  }
}
