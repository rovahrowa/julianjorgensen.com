import React, { Component } from 'react';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';
import ReactCursorPosition from 'react-cursor-position';
import Signature from 'assets/icons/julian-signature.svg';
import helperStyles from 'styles/helpers.css';
import LandingCategories from './components/LandingCategories';
import LandingBackground from './components/LandingBackground';
import Video from './components/Video';
import styles from './index.css';

@connect(({ scrollPosition }) => ({
  scroll: scrollPosition.y,
}))
export default class HomeLanding extends Component {
  constructor() {
    super();

    this.state = {
      playVideo: false,
      hasVideoPlayed: false,
      cursorPosition: {},
    };
  }

  handleCursorPositionChange = (cursorPosition) => {
    this.setState({
      cursorPosition,
    });
  }

  handleActivationChange = ({ isActive }) => {
    this.setState({
      cursorActive: isActive,
    });
  }

  handlePlayVideo = () => {
    this.setState({
      playVideo: true,
      hasVideoPlayed: false,
    });
  }

  handleCloseVideo = () => {
    this.setState({
      playVideo: false,
    });
  }

  handleVideoHasPlayed = () => {
    this.setState({
      hasVideoPlayed: true,
    });
  }

  render() {
    const { scroll } = this.props;
    const { playVideo, cursorPosition } = this.state;
    const dynamicBgStyles = {
      opacity: 1 - (scroll / 300),
    };

    const dynamicFooterStyles = {
      opacity: 1 - (scroll / 100),
    };

    return (
      <ReactCursorPosition onActivationChanged={this.handleActivationChange} onPositionChanged={this.handleCursorPositionChange}>
        <div className={`${styles.wrapper} ${playVideo ? styles.isPlayingVideo : ''}`}>
          <Parallax strength={400} className={styles.wrap}>
            <Background className={styles.background}>
              <div style={dynamicBgStyles} className={styles.backgroundContent}>
                <div className={styles.hero}>
                  <h1 className={styles.header}>Impress your online audience</h1>
                  <p className={styles.subheader}>I work with agencies and startups to create impressive <span className={helperStyles.nobr}>web apps</span>, ecommerce <span className={helperStyles.nobr}>and branding sites.</span></p>
                </div>
                <LandingCategories className={styles.categories} />
              </div>
              <LandingBackground active={this.state.cursorActive} position={cursorPosition} />
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
    );
  }
}
