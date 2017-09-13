import React from 'react';
import DocumentMeta from 'react-document-meta';
import Carousel from 'rmc-nuka-carousel';
import Marquee from 'components/Marquee';

import styles from './index.css';

export default class Automation extends React.Component{
  constructor(){
    super();
  }

  render() {

    return (
      <div className={styles.wrapper}>
        <Marquee title="Automation" bgColor="blue" />

        <div className={styles.container}>
          <Carousel>
            <img height="400" src="http://placehold.it/1000x400/001C9B/ffffff/&text=slide1"/>
            <img height="400" src="http://placehold.it/1000x400/001C9B/ffffff/&text=slide2"/>
            <img height="400" src="http://placehold.it/1000x400/001C9B/ffffff/&text=slide3"/>
            <img height="400" src="http://placehold.it/1000x400/001C9B/ffffff/&text=slide4"/>
            <img height="400" src="http://placehold.it/1000x400/001C9B/ffffff/&text=slide5"/>
            <img height="400" src="http://placehold.it/1000x400/001C9B/ffffff/&text=slide6"/>
          </Carousel>
        </div>
      </div>
    )
  }
}