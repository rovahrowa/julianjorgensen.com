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
      <div>
        <Marquee title="Front-End" bgColor="purple-blue" />

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
