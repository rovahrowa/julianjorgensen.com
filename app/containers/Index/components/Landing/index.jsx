import React from 'react';
import ReactPlayer from 'react-player';

import Button from 'react-toolbox/lib/button';
import styles from './index.css';

export default class HomeLanding extends React.Component{
  constructor(){
    super();

    this.state = {
      videoHidden: true
    }
  }

  startVideo() {
    this.setState({
      videoHidden: false
    });
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>This is the home landing page!</h1>
        <ReactPlayer url='https://vimeo.com/channels/staffpicks/214023666' className={styles.videoPlayer} width="100%" hidden={this.state.videoHidden} preload="true" />


        <div className={styles.preFooter}></div>
        <footer className={styles.footer}>
        </footer>
      </div>
    )
  }
}
