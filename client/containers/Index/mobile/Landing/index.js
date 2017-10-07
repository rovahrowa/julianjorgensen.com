import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import Carousel from 'rmc-nuka-carousel';
import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play-circle.svg';
import MobileIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/mobile-phone-pay.svg';
import DevicesIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/devices.svg';
import SketchIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/sketch-no-paths.svg';
import LoadingSpinner from 'components/LoadingSpinner';
import YouTube from 'react-youtube';
import Slide from './components/Slide';
import styles from './index.css';

import Dots from 'components/Carousel/components/Dots';

let slides = [{
  title: 'Impress',
  content: <div className={styles.content}>I create impressive web apps, ecommerce and brand sites.</div>,
  className: styles.slideLanding
}, {
  title: 'Ecommerce',
  content: <div className={styles.content}>Make your products shine;<br />mobile and desktop alike.</div>,
  className: styles.slideEcommerce,
  backgroundOverlay: <div className={styles.slideBgOverlay}><MobileIcon /></div>
}, {
  title: 'Web Apps',
  content: <div className={styles.content}>Like mobile apps; they make everything easier.</div>,
  className: styles.slideWebApps,
  backgroundOverlay: <div className={styles.slideBgOverlay}><DevicesIcon /></div>
}, {
  title: 'Brand sites',
  content: <div className={styles.content}>Customized to your brand, and built to scale.</div>,
  className: styles.slideBrandSites,
  backgroundOverlay: <div className={styles.slideBgOverlay}><SketchIcon /></div>
}]

export default class HomeLandingMobile extends React.Component {
  state = {
    activeSlide: 0
  };

  onVideoReady = (event) => {
    this.video = event.target;
  }

  onVideoStateChange = (event) => {
    switch (event.data) {
      case 3:
        this.setState({
          videoIsLoading: true
        });
        break;
      default:
        this.setState({
          videoIsLoading: false
        });
    }
  }

  handleSlideChange = (prevSlide, nextSlide) => {
    this.setState({
      activeSlide: nextSlide
    });
  }

  render() {
    let { activeSlide, videoIsLoading } = this.state;
    let _ctaStyles = cn(styles.cta, {
      [styles.white]: activeSlide === 1 || activeSlide === 2 || activeSlide === 3
    });

    return (
      <div className={styles.wrapper}>
        <Carousel className={styles.slider} decorators={[Dots]} beforeSlide={this.handleSlideChange} wrapAround={true} autoplay={!videoIsLoading} speed={800} autoplayInterval={7000}>
        {slides.map((slide, index) => {
          return (
            <Slide
              key={index}
              title={slide.title}
              titleClassName={styles.title}
              content={slide.content}
              className={slide.className}
              backgroundOverlay={slide.backgroundOverlay}
            />
          )
        })}
        </Carousel>

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
