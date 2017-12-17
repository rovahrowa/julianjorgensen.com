import React, { Component } from 'react';
import cn from 'classnames';
import Loadable from 'react-loadable';
import { delay } from 'utils';
import LoadingSpinner from 'components/LoadingSpinner';
import CloseIcon from 'assets/icons/FontAwesome/regular/times.svg';
import Actions from './components/Actions';
import Footer from './components/Footer';
import styles from './index.css';

const Player = Loadable({
  loader: () => delay(2000).then(() => import('./components/Player')),
  loading: LoadingSpinner,
});

export default class HomeLandingVideo extends Component {
  constructor() {
    super();

    this.state = {};
    this.video = null;
    this.handleToggleSound = this.handleToggleSound.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.loadVideo !== newProps.loadVideo && newProps.loadVideo) {
      this.handleLoadVideo();
    }
  }

  onVideoReady = (event) => {
    this.video = event.target;
  }

  onVideoPlay = () => {
    this.setState({
      isPlaying: true,
    });
  }

  handlePlayVideo = () => {
    if (this.video) {
      this.video.seekTo(0);
      this.video.playVideo();
    }
  }

  handleLoadVideo = () => {
    if (!this.video) {
      this.loadingVideo = setTimeout(() => {
        this.handleLoadVideo();
      }, 200);
      return false;
    }

    this.handlePlayVideo();
    return true;
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
    // const hasVideoPlayed = percentagePlayed > 60;
    const hasVideoPlayed = true;
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
      hasVideoPlayed, loadVideo, handleVideoClick,
    } = this.props;

    const { isPlaying } = this.state;

    const wrapperStyles = cn(styles.wrapper, {
      [styles.loadVideo]: loadVideo,
      [styles.isPlaying]: isPlaying,
    });

    return (
      <div className={wrapperStyles}>
        <Actions
          isPlaying={loadVideo}
          hasVideoPlayed={hasVideoPlayed}
          mute={this.state.videoMute}
          handleToggleSound={this.handleToggleSound}
          handleVideoClick={handleVideoClick}
        />
        <div className={styles.videoWrapper} onClick={this.handleCloseVideo}>
          <Player styles={styles.player} onReady={this.onVideoReady} onPlay={this.onVideoPlay} />
          <div className={styles.close} onClick={this.handleCloseVideo}><CloseIcon /></div>
          <LoadingSpinner className={styles.loading} />
        </div>
        <Footer />
      </div>
    );
  }
}
