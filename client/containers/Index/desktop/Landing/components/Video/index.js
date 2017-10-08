import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play.svg';
import CloseIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/times.svg';
import SeeMore from './components/SeeMore';
import Footer from './components/Footer';
import styles from './index.css';
import {delay} from 'utils';
import Loadable from 'react-loadable';
import LoadingSpinner from 'components/LoadingSpinner';
const Player = Loadable({
  loader: () => delay(2000).then(() => import('./components/Player')),
  loading: LoadingSpinner
});

export default class HomeLandingVideo extends React.Component {
  constructor() {
    super();

    this.video = null;
    this.state = {};
  }

  onVideoReady = (event) => {
    console.log('on ready', event.target);
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
      videoMute: !this.state.videoMute
    });
  }

  handleCloseVideo = () => {
    this.props.onVideoEnd();

    let percentagePlayed = (this.video.getCurrentTime() / this.video.getDuration()) * 100;
    let hasVideoPlayed = percentagePlayed > 60 ? true : false;
    hasVideoPlayed ? this.props.onVideoHasPlayed() : '';

    if (!hasVideoPlayed) {
      this.video.stopVideo();
    }

    if (this.video.isMuted()) {
      this.setState({
        videoMute: true
      });
    } else {
      this.setState({
        videoMute: false
      });
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.playVideo !== newProps.playVideo && newProps.playVideo) {
      this.handlePlayVideo();
    }
  }


  render() {
    let { site, hasVideoPlayed, playVideo, onClose, dynamicStyles, handleVideoClick } = this.props;

    let _wrapperStyles = cn(styles.wrapper, {
      [styles.isPlaying]: playVideo
    });

    let renderAction = () => {
      if (!hasVideoPlayed) {
        return (
          <div className={styles.ctas} style={dynamicStyles}>
            <div className={styles.profileImage}></div>
            <div className={styles.watchVideo}>
              <div className={styles.icon} onClick={handleVideoClick}><PlayIcon /></div>
              <div className={styles.label} onClick={handleVideoClick}>Watch Video</div>
            </div>
          </div>
        )
      } else {
        return (
          <SeeMore 
            videoMute={this.state.videoMute}
            handleToggleSound={this.handleToggleSound}
            hasVideoPlayed={this.props.hasVideoPlayed}
            handleReplay={handleVideoClick} 
          />
        )
      }
    }

    return (
      <div className={_wrapperStyles}>
        {renderAction()}
        <div className={styles.videoWrapper} onClick={this.handleCloseVideo}>
          <Player styles={styles.player} onReady={this.onVideoReady} />
          <div className={styles.close} onClick={this.handleCloseVideo}><CloseIcon /></div>
        </div>
        <Footer />
      </div>
    )
  }
}
