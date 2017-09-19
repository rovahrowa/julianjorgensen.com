import React from 'react';
import DocumentMeta from 'react-document-meta';
import Marquee from 'components/Marquee';
import styles from './index.css';

export default class FrontEnd extends React.Component{
  constructor(){
    super();
  }

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
    )
  }
}
