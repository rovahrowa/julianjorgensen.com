import React from 'react';
import Carousel from 'rmc-nuka-carousel';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import Slide from 'components/slide';
import styles from './index.css';

let carouselDecorators = Carousel.getDefaultProps().decorators.slice(2, 3);
carouselDecorators[0].position = 'CenterRight';
console.log('c decorators', carouselDecorators);

export default class HomeAutomation extends React.Component{
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Automation</h2>
          <Button
            label='See more'
            href='/automation'
            hollow
            tiny
            blue
          />
        </div>

        <div className={styles.body}>
          <div className={styles.hero}>
            <h3 className={styles.heroHeader}>Be one step ahead.</h3>
          </div>
          <div className={styles.carousel}>
            <Carousel decorators={carouselDecorators} vertical slidesToShow={2} wrapAround={true} autoplay autoplayInterval={5000} >
              <Slide
                label='Invoice automation'
                labelClassName={styles.slideLabel}
                className={styles.slide}
                href='/automation'
              />
              <Slide
                label='API automation'
                labelClassName={styles.slideLabel}
                className={styles.slide}
              />
              <Slide
                label='Email automation'
                labelClassName={styles.slideLabel}
                className={styles.slide}
              />
              <Slide
                label='Automated tests & QA'
                labelClassName={styles.slideLabel}
                className={styles.slide}
              />
              <Slide
                label='Automated workflows'
                labelClassName={styles.slideLabel}
                className={styles.slide}
              />
            </Carousel>
          </div>
        </div>
      </div>
    )
  }
}
