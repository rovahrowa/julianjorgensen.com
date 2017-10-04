import React from 'react';
import Carousel from 'rmc-nuka-carousel';
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
  render() {
    return (
      <div className={styles.wrapper}>
        <Carousel className={styles.slider} decorators={[Dots]} wrapAround={true} autoplay speed={800} autoplayInterval={5000}>
        {slides.map((slide, index) => {
          return (
            <Slide
              key={index}
              title={slide.title}
              titleClassName={styles.title}
              content={slide.content}
              className={styles[`slide${index+1}`]}
              playButtonClassName={styles.playButton}
            />
          )
        })}
        </Carousel>
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
        />

      </div>
    )
  }
}
