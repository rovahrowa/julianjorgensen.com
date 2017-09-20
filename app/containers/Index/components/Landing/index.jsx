import React from 'react';
import ReactPlayer from 'react-player';
import ReactCursorPosition from 'react-cursor-position';

import Button from 'components/Button';
import LandingFooter from './components/LandingFooter';
import LandingCategories from './components/LandingCategories';
import styles from './index.css';

export default class HomeLanding extends React.Component{
  constructor(){
    super();

    this.state = {
      videoHidden: true,
      position: {}
    }
  }

  startVideo() {
    this.setState({
      videoHidden: false
    });
  }

  handlePositionChange = (position) => {
    this.setState({position});
  }

  render() {
    return (
      <ReactCursorPosition
      onPositionChanged={this.handlePositionChange}
      >
        <div className={styles.wrapper}>
          <div className={styles.hero}>
            <h1 className={styles.header}>Ecommerce development</h1>
            <p className={styles.subheader}>I help agencies and startups create impressive web apps, ecommerce and branding sites.</p>
          </div>

          <ReactPlayer url='https://vimeo.com/channels/staffpicks/214023666' className={styles.videoPlayer} width="100%" hidden={this.state.videoHidden} preload="true" />

          <LandingCategories position={this.state.position} />

          <div className={styles.profileImage}></div>

          <LandingFooter />
        </div>
      </ReactCursorPosition>        
      )
  }
}
