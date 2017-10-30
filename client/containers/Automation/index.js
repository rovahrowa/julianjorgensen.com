import React, { Component } from 'react';
import Carousel from 'rmc-nuka-carousel';
import Marquee from 'components/Marquee';

import styles from './index.css';

export default class Automation extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <Marquee title="Automation" className={styles.marquee} />

        <div className={styles.container}>
          <Carousel className={styles.carousel}>
            <img height="400" src="http://placehold.it/1000x400/ffffff/000000/&text=slide1"/>
            <img height="400" src="http://placehold.it/1000x400/ffffff/000000/&text=slide2"/>
            <img height="400" src="http://placehold.it/1000x400/ffffff/000000/&text=slide3"/>
            <img height="400" src="http://placehold.it/1000x400/ffffff/000000/&text=slide4"/>
            <img height="400" src="http://placehold.it/1000x400/ffffff/000000/&text=slide5"/>
            <img height="400" src="http://placehold.it/1000x400/ffffff/000000/&text=slide6"/>
          </Carousel>
        </div>
      </div>
    )
  }
}
