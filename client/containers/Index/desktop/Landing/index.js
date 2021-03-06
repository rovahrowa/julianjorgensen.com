import React, { Component } from 'react';
import cn from 'classnames';
import ReactCursorPosition from 'react-cursor-position';
import { Parallax, Background } from 'react-parallax';
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
    const { prospectLogo, headline, subheadline } = this.props.content || {};
    const { loadVideo } = this.state;
    const wrapperStyles = cn(styles.wrapper, {
      [styles.isPlayingVideo]: loadVideo,
    });

    const renderProspectLogo = () => {
      if (!prospectLogo) return false;
      return <div className={styles.prospectLogo} style={{ backgroundImage: `url(${prospectLogo.fields.file.url})` }} />;
    };

    return (
      <div>
        <ReactCursorPosition onPositionChanged={this.handleCursorPositionChange}>
          <Parallax strength={300} className={wrapperStyles} bgStyle={{ width: '100%' }}>
            <Background>
              <div className={wrapperStyles}>
                <div className={styles.content}>
                  <div className={styles.landingContent}>
                    <div className={styles.hero}>
                      <h1 className={styles.header}>{headline || 'Impress your users'}</h1>
                      <p className={styles.subheader}>{subheadline || 'I develop impressive web apps, ecommerce, and branding sites.'}</p>
                    </div>
                    <Categories playingVideo={loadVideo} content={this.props.content} />
                    {renderProspectLogo()}
                  </div>
                </div>

                <Overlay cursorPosition={this.state.cursorPosition} />

                <BgVideo />
              </div>
            </Background>
          </Parallax>
        </ReactCursorPosition>

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
