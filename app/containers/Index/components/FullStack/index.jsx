import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { Parallax } from 'react-scroll-parallax';
import Button from 'components/Button';

import styles from './index.css';

export default class HomeFullStack extends React.Component{
  render() {
    return (
      <div className={styles.wrapper}>
        <Parallax
            className={styles.parallaxBg}
            offsetYMax={10}
            offsetYMin={-50}
            slowerScrollRate
            tag="div"
        >
          <img src='/images/code-bg.jpg' />
        </Parallax>

        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Full-Stack Development</h2>
            <Button
              label='See more'
              hollow
              tiny
              blue
            />
          </div>

          <Row>
            <Col xs={6} md={3}>
              <div className={styles.box}>Scalable</div>
            </Col>
            <Col xs={6} md={3}>
              <div className={styles.box}>API integrations</div>
            </Col>
            <Col xs={6} md={3}>
              <div className={styles.box}>Automation</div>
            </Col>
            <Col xs={6} md={3}>
              <div className={styles.box}>The future of CMS: Cloud based API</div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
