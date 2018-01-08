import React, { Component } from 'react';
import Carousel from 'rmc-nuka-carousel';
import Dots from 'components/Carousel/components/Dots';
import landingBg from 'assets/images/mobile-placeholder.png';
import codeBg from 'assets/images/code-bg-small.jpg';
import MobileIcon from 'assets/icons/colored/mobile-phone-pay.svg';
import DevicesIcon from 'assets/icons/colored/devices.svg';
import SketchIcon from 'assets/icons/colored/sketch-no-paths.svg';
import Video from './components/Video';
import Slide from './components/Slide';
import styles from './index.css';

const slides = [
  {
    title: 'Impress',
    content: <div className={styles.content}>I create impressive web apps, ecommerce and brand sites.</div>,
    className: styles.slideLanding,
    bgImage: landingBg,
  }, {
    title: 'Ecommerce',
    content: <div className={styles.content}>Make your products shine;<br />mobile and desktop alike.</div>,
    className: styles.slideEcommerce,
    backgroundOverlay: <div className={styles.slideBgOverlay}><MobileIcon /></div>,
  }, {
    title: 'Web Apps',
    content: <div className={styles.content}>Like mobile apps; they make everything easier.</div>,
    className: styles.slideWebApps,
    backgroundOverlay: <div className={styles.slideBgOverlay} style={{ backgroundImage: `url(${codeBg})` }}><DevicesIcon /></div>,
  }, {
    title: 'Brand sites',
    content: <div className={styles.content}>Customized to your brand, and built to scale.</div>,
    className: styles.slideBrandSites,
    backgroundOverlay: <div className={styles.slideBgOverlay}><SketchIcon /></div>,
  }
];

export default class HomeLandingMobile extends Component {
  state = {
    isLoaded: false,
    activeSlide: 0,
  };

  componentDidMount() {
    this.setState({
      isLoaded: true,
    });
  }

  onVideoLoaded = () => {
    this.setState({
      videoIsLoading: false,
    });
  }

  onVideoLoad = () => {
    this.setState({
      videoIsLoading: true,
    });
  }
  
  handleSlideChange = (prevSlide, nextSlide) => {
    this.setState({
      activeSlide: nextSlide,
    });
  }

  render() {
    const { isLoaded, videoIsLoading } = this.state;

    return (
      <div className={styles.wrapper}>
        <Carousel className={styles.slider} decorators={[Dots]} beforeSlide={this.handleSlideChange} wrapAround autoplay={!videoIsLoading} speed={800} autoplayInterval={7000}>
          {slides.map(slide => (
            <Slide
              key={slide.title}
              title={slide.title}
              titleClassName={styles.title}
              content={slide.content}
              className={slide.className}
              backgroundOverlay={slide.backgroundOverlay}
              slideBgImage={slide.bgImage || null}
            />
          ))}
        </Carousel>

        <Video
          render={isLoaded}
          onVideoLoaded={this.onVideoLoaded}
          onVideoLoad={this.onVideoLoad}
          {...this.state}
        />
      </div>
    );
  }
}
