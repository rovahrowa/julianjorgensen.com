import React from 'react';
import cn from 'classnames';
import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play-circle.svg';
import LoadingSpinner from 'components/LoadingSpinner';
import YouTube from 'react-youtube';
import styles from './index.css';

export default class HomeLandingMobileVideo extends React.Component {
  constructor() {
    super();
  }

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
    let { render, activeSlide, videoIsLoading } = this.props;

    if (!render) {
      return null;
    }

    let _ctaStyles = cn(styles.cta, {
      [styles.white]: activeSlide === 1 || activeSlide === 2 || activeSlide === 3
    });

    return (
      <div className={styles.wrapper}>
        <div className={_ctaStyles}>
          {videoIsLoading ? <LoadingSpinner /> : <PlayIcon />}

          <YouTube
            videoId="_OJzg063OyI"
            className={styles.player}
            opts={{
              playerVars: { 
                autoplay: 0,
                showinfo: 0,
                rel: 0
              }
            }}
            onReady={this.onVideoReady}
            onStateChange={this.onVideoStateChange}
          />
        </div>      
      </div>
    )
  }
}
