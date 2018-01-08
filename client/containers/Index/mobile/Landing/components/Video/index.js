import React, { Component } from 'react';
import cn from 'classnames';
import { isIOS } from 'react-device-detect';
import PlayIcon from 'assets/icons/FontAwesome/solid/play-circle.svg';
import LoadingSpinner from 'components/LoadingSpinner';
import YouTube from 'react-youtube';
import styles from './index.css';

export default class HomeLandingMobileVideo extends Component {
  state = {};

  onVideoReady = (event) => {
    this.video = event.target;
  }

  onVideoPlay = () => {
    this.setState({
      isPlaying: true,
    });
  }

  onVideoStateChange = (event) => {
    switch (event.data) {
      case 3:
        this.props.onVideoLoad();
        break;
      default:
        this.props.onVideoLoaded();
    }
  }

  render() {
    const { render, activeSlide, videoIsLoading } = this.props;

    if (!render) {
      return null;
    }

    const ctaStyles = cn(styles.cta, {
      [styles.white]: activeSlide === 1 || activeSlide === 2 || activeSlide === 3,
    });

    const wrapperStyles = cn(styles.wrapper, {
      [styles.isNotIOS]: !isIOS,
      [styles.isPlaying]: this.state.isPlaying,
    });


    return (
      <div className={wrapperStyles}>
        <div className={ctaStyles}>
          {videoIsLoading ? <LoadingSpinner /> : <PlayIcon />}
          <YouTube
            videoId="r4r7Cauj-aI"
            className={styles.player}
            opts={{
              playerVars: {
                autoplay: 0,
                showinfo: 0,
                rel: 0,
              }
            }}
            onReady={this.onVideoReady}
            onStateChange={this.onVideoStateChange}
            onPlay={this.onVideoPlay}
          />
        </div>
      </div>
    );
  }
}
