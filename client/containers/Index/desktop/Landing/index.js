import React, { Component } from 'react';
import cn from 'classnames';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';
import Signature from 'assets/icons/julian-signature.svg';
import helperStyles from 'styles/helpers.css';
import LandingBackground from './components/LandingBackground';
import Video from './components/Video';
import styles from './index.css';

@connect(({ scrollPosition }) => ({
  scroll: scrollPosition.y,
}))
export default class HomeLanding extends Component {
  constructor() {
    super();

    this.state = {};
    this.handleLoadVideo = this.handleLoadVideo.bind(this);
  }

  handleLoadVideo = () => {
    this.setState({
      loadVideo: true,
      hasVideoPlayed: false,
    });
  }

  handleCloseVideo = () => {
    this.setState({
      loadVideo: false,
    });
  }

  handleVideoHasPlayed = () => {
    this.setState({
      hasVideoPlayed: true,
    });
  }

  render() {
    const { scroll } = this.props;
    const { loadVideo } = this.state;
    const wrapperStyles = cn(styles.wrapper, {
      [styles.isPlayingVideo]: loadVideo,
    });
    const dynamicBgStyles = {
      opacity: 1 - (scroll / 300),
    };

    return (
      <div className={wrapperStyles}>
        <Parallax strength={400} className={styles.wrap}>
          <Background className={styles.background}>
            <div style={dynamicBgStyles} className={styles.backgroundContent}>
              <div className={styles.hero}>
                <h1 className={styles.header}>Impress your online audience</h1>
                <p className={styles.subheader}>I work with agencies and startups to create impressive <span className={helperStyles.nobr}>web apps</span>, ecommerce <span className={helperStyles.nobr}>and branding sites.</span></p>
              </div>
            </div>
            <LandingBackground playingVideo={loadVideo} />
            <Signature className={styles.signature} />
          </Background>
        </Parallax>

        <Video
          onVideoEnd={this.handleCloseVideo}
          onVideoHasPlayed={this.handleVideoHasPlayed}
          handleVideoClick={this.handleLoadVideo}
          {...this.state}
        />
      </div>
    );
  }
}
