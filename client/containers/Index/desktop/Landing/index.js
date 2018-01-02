import React, { Component } from 'react';
import cn from 'classnames';
import ReactCursorPosition from 'react-cursor-position';
import { Parallax } from 'react-scroll-parallax';
import Overlay from './components/Overlay';
import Video from './components/Video';
import Categories from './components/Categories';
import BgVideo from './components/BgVideo';
import styles from './index.css';

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

  handleCursorPositionChange = (cursorPosition) => {
    this.setState({
      cursorPosition,
    });
  }

  render() {
    // const { scrollPosition } = this.props;
    const { loadVideo } = this.state;
    const wrapperStyles = cn(styles.wrapper, {
      [styles.isPlayingVideo]: loadVideo,
    });
    
    return (
      <ReactCursorPosition onPositionChanged={this.handleCursorPositionChange}>
        <div className={wrapperStyles}>
          <div className={styles.content}>
            <Parallax
              y={['00px', '300px']}
              opacity={[3, -0.8]}
            >
              <div className={styles.landingContent}>
                <div className={styles.hero}>
                  <h1 className={styles.header}>Impress your online audience</h1>
                  <p className={styles.subheader}>I develop impressive web apps, ecommerce, and branding sites.</p>
                </div>
                <Categories playingVideo={loadVideo} />
              </div>
            </Parallax>
          </div>

          <Overlay cursorPosition={this.state.cursorPosition} />

          <BgVideo />
          <Video
            onVideoEnd={this.handleCloseVideo}
            onVideoHasPlayed={this.handleVideoHasPlayed}
            handleVideoClick={this.handleLoadVideo}
            {...this.state}
          />
        </div>
      </ReactCursorPosition>
    );
  }
}
