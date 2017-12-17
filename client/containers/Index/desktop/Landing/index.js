import React, { Component } from 'react';
import cn from 'classnames';
import { withScroll } from 'react-window-decorators';
import Signature from 'assets/icons/julian-signature.svg';
import Overlay from './components/Overlay';
import Video from './components/Video';
import Categories from './components/Categories';
import BgVideo from './components/BgVideo';
import styles from './index.css';

@withScroll
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
    const { scrollPosition } = this.props;
    const { loadVideo } = this.state;
    const wrapperStyles = cn(styles.wrapper, {
      [styles.isPlayingVideo]: loadVideo,
    });
    
    const dynamicBgStyles = {
      opacity: 1 - (scrollPosition / 200),
      transform: `translateY(${scrollPosition / 4}px)`
    };

    return (
      <div className={wrapperStyles}>
        <div style={dynamicBgStyles} className={styles.content}>
          <div className={styles.hero}>
            <h1 className={styles.header}>Impress your online audience</h1>
            <p className={styles.subheader}>I develop impressive web apps, ecommerce, and branding sites.</p>
          </div>
          <Categories playingVideo={loadVideo} />
          {/* <Signature className={styles.signature} /> */}
        </div>
        <Overlay />
        <BgVideo />
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
