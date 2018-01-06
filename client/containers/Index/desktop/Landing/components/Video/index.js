import React, { Component } from 'react';
import cn from 'classnames';
import ReactTooltip from 'react-tooltip';
import Loadable from 'react-loadable';
import { delay } from 'utils';
import LoadingSpinner from 'components/LoadingSpinner';
import CloseIcon from 'assets/icons/FontAwesome/regular/times.svg';
import Actions from './components/Actions';
import Footer from './components/Footer';
import styles from './index.css';

const TIME_WHEN_VIDEO_ENDS = 278;

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

  componentDidMount() {
    this.setState({
      showVideoCta: true,
    });
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
      setInterval(() => {
        const currentVideoTime = this.video.getCurrentTime();
        if (currentVideoTime < TIME_WHEN_VIDEO_ENDS) {
          this.handleCloseVideo();
        }
      }, 1000);
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
    this.props.onVideoHasPlayed();

    const currentVideoTime = this.video.getCurrentTime();
    if (currentVideoTime < TIME_WHEN_VIDEO_ENDS) {
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
          showVideoCta={this.state.showVideoCta}
        />
        <div className={styles.videoWrapper} onClick={this.handleCloseVideo}>
          <Player styles={styles.player} onReady={this.onVideoReady} onPlay={this.onVideoPlay} />
          <div className={styles.close} onClick={this.handleCloseVideo} data-tip="Close video" data-effect="solid"><CloseIcon /></div>
          <LoadingSpinner className={styles.loading} />
        </div>
        <Footer />
        <ReactTooltip />
      </div>
    );
  }
}
