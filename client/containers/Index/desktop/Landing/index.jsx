import React from 'react';
import cn from 'classnames';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';
import ReactCursorPosition from 'react-cursor-position';

import Button from 'components/Button';
import LandingCategories from './components/LandingCategories';
import LandingBackground from './components/LandingBackground';
import Video from './components/Video';
import Signature from '-!svg-react-loader?name=Icon!assets/icons/julian-signature.svg';
import styles from './index.css';
import helperStyles from 'styles/helpers.css';

@connect(({ scrollPosition }) => ({
  scroll: scrollPosition.y
}))
export default class HomeLanding extends React.Component {
  constructor() {
    super();

    this.state = {
      playVideo: false,
      hasVideoPlayed: false,
      position: {}
    }
  }

  handlePositionChange = (position) => {
    this.setState({
      position
    });
  }

  handleActivationChange = ({ isActive }) => {
    this.setState({
      cursorActive: isActive
    });
  }

  handlePlayVideo = () => {
    this.setState({
      playVideo: true,
      hasVideoPlayed: false
    });
  }

  handleCloseVideo = () => {
    this.setState({
      playVideo: false
    });
  }

  handleVideoHasPlayed = () => {
    console.log('video has played');
    this.setState({
      hasVideoPlayed: true
    });
  }

  render() {
    let { scroll } = this.props;
    let { playVideo } = this.state;
    let dynamicBgStyles = {
      opacity: 1 - (scroll / 300)
    };

    let dynamicFooterStyles = {
      opacity: 1 - (scroll / 100)
    };

    return (
      <ReactCursorPosition onActivationChanged={this.handleActivationChange} onPositionChanged={this.handlePositionChange}>
        <div className={`${styles.wrapper} ${playVideo ? styles.isPlayingVideo : ''}`}>
          <Parallax strength={400} className={styles.wrap}>
            <Background className={styles.background}>
              <div style={dynamicBgStyles} className={styles.backgroundContent}>
                <div className={styles.hero}>
                  <h1 className={styles.header}>Impress your online audience</h1>
                  <p className={styles.subheader}>I help agencies and startups create impressive <span className={helperStyles.nobr}>web apps</span>, ecommerce <span className={helperStyles.nobr}>and branding sites.</span></p>
                </div>
                <LandingCategories className={styles.categories} />
              </div>
              <LandingBackground active={this.state.cursorActive} position={this.state.position} />
              <Signature className={styles.signature} />
            </Background>
          </Parallax>

          <Video
            onVideoEnd={this.handleCloseVideo}
            onVideoHasPlayed={this.handleVideoHasPlayed}
            dynamicStyles={dynamicFooterStyles}
            handleVideoClick={this.handlePlayVideo}
            {...this.state}
          />
        </div>
      </ReactCursorPosition>
    )
  }
}
