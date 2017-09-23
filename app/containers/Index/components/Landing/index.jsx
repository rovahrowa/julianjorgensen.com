import React from 'react';
import cn from 'classnames';
import { Parallax, Background } from 'react-parallax';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import ReactCursorPosition from 'react-cursor-position';

import Button from 'components/Button';
import LandingFooter from './components/LandingFooter';
import LandingCategories from './components/LandingCategories';
import LandingBackground from './components/LandingBackground';
import styles from './index.css';

@connect(
  ({ scrollPosition }) => ({
    scroll: scrollPosition.y
  })
)
export default class HomeLanding extends React.Component{
  constructor() {
    super();

    this.state = {
      videoHidden: true,
      position: {}
    }
  }

  startVideo() {
    this.setState({
      videoHidden: false
    });
  }

  handlePositionChange = (position) => {
    this.setState({position});
  }

  render() {
    let { scroll } = this.props;
    let dynamicBgStyles = {
      opacity: 1-(scroll/500)
    };

    let dynamicFooterStyles = {
      opacity: 1-(scroll/100)
    };

    return (
      <ReactCursorPosition
        onPositionChanged={this.handlePositionChange}
      >
        <div className={styles.wrapper}>
          <Parallax strength={300} className={styles.wrap}>
            <Background className={styles.background}>
              <div style={dynamicBgStyles} className={styles.backgroundContent}>
                <div className={styles.hero}>
                  <h1 className={styles.header}>Impress your online audience</h1>
                  <p className={styles.subheader}>I help agencies and startups create impressive web apps, ecommerce and branding sites.</p>
                </div>
                <LandingCategories />
              </div>
              <LandingBackground position={this.state.position} />
            </Background>
          </Parallax>

          <LandingFooter dynamicStyles={dynamicFooterStyles} />
          <ReactPlayer url='https://vimeo.com/channels/staffpicks/214023666' className={styles.videoPlayer} width="100%" hidden={this.state.videoHidden} preload="true" />
        </div>
      </ReactCursorPosition>
    )
  }
}
