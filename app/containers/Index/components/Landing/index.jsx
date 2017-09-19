import React from 'react';
import ReactPlayer from 'react-player';
import ReactCursorPosition from 'react-cursor-position';

import Button from 'react-toolbox/lib/button';
import LandingFooter from './components/LandingFooter';
import LandingCategories from './components/LandingCategories';
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
      <ReactCursorPosition
      onPositionChanged={(position) => console.log('position', position)}
      >
        <div className={styles.wrapper}>
          <div className={styles.hero}>
            <h1 className={styles.header}>Ecommerce development</h1>
            <p className={styles.subheader}>I help agencies and startups create impressive web apps, ecommerce and branding sites.</p>
          </div>

          <ReactPlayer url='https://vimeo.com/channels/staffpicks/214023666' className={styles.videoPlayer} width="100%" hidden={this.state.videoHidden} preload="true" />

          <LandingCategories />

          <div className={styles.profileImage}></div>

          <LandingFooter />
        </div>
      </ReactCursorPosition>        
      )
  }
}
