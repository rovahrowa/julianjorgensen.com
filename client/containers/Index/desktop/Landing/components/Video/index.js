import React, { Component } from 'react';
import cn from 'classnames';
import Loadable from 'react-loadable';
import { delay } from 'utils';
import LoadingSpinner from 'components/LoadingSpinner';
import PlayIcon from 'assets/icons/FontAwesome/solid/play.svg';
import CloseIcon from 'assets/icons/FontAwesome/regular/times.svg';
import SeeMore from './components/SeeMore';
import Footer from './components/Footer';
import styles from './index.css';

const Player = Loadable({
  loader: () => delay(2000).then(() => import('./components/Player')),
  loading: LoadingSpinner,
});

export default class HomeLandingVideo extends Component {
  constructor() {
    super();

    this.video = null;
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    if (this.props.playVideo !== newProps.playVideo && newProps.playVideo) {
      this.handlePlayVideo();
    }
  }

  onVideoReady = (event) => {
    this.video = event.target;
  }

  handlePlayVideo = () => {
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
      videoMute: !this.state.videoMute,
    });
  }

  handleCloseVideo = () => {
    this.props.onVideoEnd();

    const percentagePlayed = (this.video.getCurrentTime() / this.video.getDuration()) * 100;
    const hasVideoPlayed = percentagePlayed > 60;
    if (hasVideoPlayed) this.props.onVideoHasPlayed();

    if (!hasVideoPlayed) {
      this.video.stopVideo();
    }

    if (this.video.isMuted()) {
      this.setState({
        videoMute: true,
      });
    } else {
      this.setState({
        videoMute: false,
      });
    }
  }

  render() {
    const {
      hasVideoPlayed, playVideo, dynamicStyles, handleVideoClick,
    } = this.props;

    const wrapperStyles = cn(styles.wrapper, {
      [styles.isPlaying]: playVideo,
    });

    const renderAction = () => {
      if (!hasVideoPlayed) {
        return (
          <div className={styles.ctas} style={dynamicStyles}>
            <div className={styles.profileImage} />
            <div className={styles.watchVideo}>
              <div className={styles.icon} onClick={handleVideoClick}><PlayIcon /></div>
              <div className={styles.label} onClick={handleVideoClick}>Watch Video</div>
            </div>
          </div>
        );
      }

      return (
        <SeeMore
          videoMute={this.state.videoMute}
          handleToggleSound={this.handleToggleSound}
          hasVideoPlayed={this.props.hasVideoPlayed}
          handleReplay={handleVideoClick}
        />
      );
    };

    return (
      <div className={wrapperStyles}>
        {renderAction()}
        <div className={styles.videoWrapper} onClick={this.handleCloseVideo}>
          <Player styles={styles.player} onReady={this.onVideoReady} />
          <div className={styles.close} onClick={this.handleCloseVideo}><CloseIcon /></div>
        </div>
        <Footer />
      </div>
    );
  }
}
