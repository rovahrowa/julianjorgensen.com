import React from 'react';
import ReactPlayer from 'react-player';

import Button from 'react-toolbox/lib/button';
import LandingFooter from './components/LandingFooter';
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
        <h1 className={styles.header}>Ecommerce development</h1>
        <ReactPlayer url='https://vimeo.com/channels/staffpicks/214023666' className={styles.videoPlayer} width="100%" hidden={this.state.videoHidden} preload="true" />

        <LandingFooter />
      </div>
    )
  }
}
