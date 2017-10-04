import React from 'react';
import cn from 'classnames';
import Carousel from 'rmc-nuka-carousel';
import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play-circle.svg';
import LoadingSpinner from 'components/LoadingSpinner';
import YouTube from 'react-youtube';
import Slide from './components/Slide';
import styles from './index.css';

import Dots from 'components/Carousel/components/Dots';

let slides = [{
  title: 'Impress',
  content: <div className={styles.content}>I help agencies and startups create impressive web apps, ecommerce and branding sites.</div>
}, {
  title: 'Ecommerce',
  content: <div className={styles.content}>Slide 2</div>
}, {
  title: 'Web Apps',
  content: <div className={styles.content}>Slide 3</div>
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
      [styles.white]: activeSlide === 1 || activeSlide === 2
    });

    return (
      <div className={styles.wrapper}>
        <Carousel className={styles.slider} decorators={[Dots]} beforeSlide={this.handleSlideChange} wrapAround={true} autoplay speed={800} autoplayInterval={5000}>
        {slides.map((slide, index) => {
          return (
            <Slide
              key={index}
              title={slide.title}
              titleClassName={styles.title}
              content={slide.content}
              className={styles[`slide${index+1}`]}
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
