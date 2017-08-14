import React from 'react';
import DocumentMeta from 'react-document-meta';
import Carousel from 'rmc-nuka-carousel';
import Marquee from 'components/Marquee';

import styles from './index.css';

export default class Portfolio extends React.Component{
  constructor(){
    super();
  }

  handlesNext(event) {
    event.preventDefault();
    this.refs.carousel.nextSlide();
  }

  render() {
    return (
      <div className="page-content">
        <Marquee title="Portfolio" bgColor="purple" />

        <div className={styles.container}>
          <Carousel ref="carousel">
            <img height="400" src="http://placehold.it/1000x400/712DBC/ffffff/&text=slide1"/>
            <img height="400" src="http://placehold.it/1000x400/712DBC/ffffff/&text=slide2"/>
            <img height="400" src="http://placehold.it/1000x400/712DBC/ffffff/&text=slide3"/>
            <img height="400" src="http://placehold.it/1000x400/712DBC/ffffff/&text=slide4"/>
            <img height="400" src="http://placehold.it/1000x400/712DBC/ffffff/&text=slide5"/>
            <img height="400" src="http://placehold.it/1000x400/712DBC/ffffff/&text=slide6"/>
          </Carousel>
        </div>
      </div>
    )
  }
}
