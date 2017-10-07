import React from 'react';
import cn from 'classnames';
import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play.svg';
import CloseIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/times.svg';
import SeeMore from './components/SeeMore';
import Footer from './components/Footer';
import YouTube from 'react-youtube';
import styles from './index.css';

export default class HomeLandingVideo extends React.Component {
  constructor() {
    super();

    this.video = null;
    this.state = {};
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
    let { renderVideo, hasVideoPlayed, playVideo, onClose, dynamicStyles, handleVideoClick } = this.props;

    if (!renderVideo) {
      return null;
    }

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
          <YouTube
            videoId="_OJzg063OyI"
            className={styles.player}
            opts={{
              playerVars: { 
                autoplay: 0,
                modestbranding: 1,
                showinfo: 0,
                rel: 0
              }
            }}
            onReady={this.onVideoReady}
          />
          <div className={styles.close} onClick={this.handleCloseVideo}><CloseIcon /></div>
        </div>
        <Footer />
      </div>
    )
  }
}
