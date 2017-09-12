import React from 'react';
import Carousel from 'rmc-nuka-carousel';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import Slide from 'components/slide';
import styles from './index.css';

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
            <h3 className={styles.heroHeader}>Are you ready for an automated future?</h3>
          </div>
          <div className={styles.carousel}>
            <Carousel vertical slidesToShow={2} wrapAround={true} autoplay autoplayInterval={5000} >
              <Slide
                label='Automate & Reduce costs'
                labelClassName={styles.slideLabel}
                className={styles.slide}
                href='/automation'
              />
              <Slide
                label='Automation makes everybody happy'
                labelClassName={styles.slideLabel}
                className={styles.slide}
              />
              <Slide
                label='Team Training'
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
