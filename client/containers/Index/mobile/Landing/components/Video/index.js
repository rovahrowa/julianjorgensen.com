import React, { Component } from 'react';
import cn from 'classnames';
import PlayIcon from 'assets/icons/FontAwesome/solid/play-circle.svg';
import LoadingSpinner from 'components/LoadingSpinner';
import styles from './index.css';

export default class HomeLandingMobileVideo extends Component {
  onVideoReady = (event) => {
    this.video = event.target;
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

    return (
      <div className={styles.wrapper}>
        <div className={ctaStyles}>
          {videoIsLoading ? <LoadingSpinner /> : <PlayIcon />}
        </div>
      </div>
    );
  }
}
