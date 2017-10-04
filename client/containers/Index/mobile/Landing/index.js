import React from 'react';
import Carousel from 'rmc-nuka-carousel';
import Slide from './components/Slide';
import styles from './index.css';

import Dots from 'components/Carousel/components/Dots';

let slides = [{
  title: 'Impressive Code',
  content: <div><p>I help agencies and startups create impressive web apps, ecommerce and branding sites.</p></div>
}, {
  title: 'Ecommerce',
  content: <div><p>Slide 2</p></div>
}, {
  title: 'Web Apps',
  content: <div><p>Slide 3</p></div>
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
      </div>
    )
  }
}
