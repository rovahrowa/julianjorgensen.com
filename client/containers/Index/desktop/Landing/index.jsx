import React from 'react';
import cn from 'classnames';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';
import YouTube from 'react-youtube';
import ReactCursorPosition from 'react-cursor-position';

import Button from 'components/Button';
import LandingFooter from './components/LandingFooter';
import LandingCategories from './components/LandingCategories';
import LandingBackground from './components/LandingBackground';
import SeeMore from './components/SeeMore';
import CloseIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/times.svg';
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
      position: {}
    }

    this.video = null;
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

  onVideoReady = (event) => {
    this.video = event.target;
  }

  handlePlayVideo = () => {
    this.setState({
      playVideo: true,
      hasVideoPlayed: false
    });

    this.video.seekTo(0);
    this.video.playVideo();
  }

  handleToggleSound = () => {
    if (this.state.videoMute) {
      this.video.unMute();
    } else {
      this.video.mute();
    }

    this.setState({
      videoMute: !this.state.videoMute
    });
  }

  handleCloseVideo = () => {
    let percentagePlayed = (this.video.getCurrentTime() / this.video.getDuration()) * 100;
    let hasVideoPlayed = percentagePlayed > 60 ? true : false;
    this.setState({
      playVideo: false,
      hasVideoPlayed: hasVideoPlayed
    });

    if (!hasVideoPlayed) {
      this.video.stopVideo();
    }
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
              <SeeMore videoMute={this.state.videoMute} handleToggleSound={this.handleToggleSound} hasVideoPlayed={this.state.hasVideoPlayed} handleReplay={this.handlePlayVideo} />
            </Background>
          </Parallax>

          <LandingFooter className={styles.footer} dynamicStyles={dynamicFooterStyles} hasVideoPlayed={this.state.hasVideoPlayed} handleVideoClick={this.handlePlayVideo} />
          <div className={styles.videoWrapper} onClick={this.handleCloseVideo}>
            <YouTube
              videoId="_OJzg063OyI"
              className={styles.player}
              opts={{
                playerVars: { 
                  autoplay: 0,
                  modestbranding: 1,
                  showinfo: 0,
                  rel: 0
                }
              }}
              onReady={this.onVideoReady}
            />
            <div className={styles.close} onClick={this.handleCloseVideo}><CloseIcon /></div>
          </div>
        </div>
      </ReactCursorPosition>
    )
  }
}
