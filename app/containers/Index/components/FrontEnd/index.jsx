import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import styles from './index.css';

export default class HomeFrontEnd extends React.Component{
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Front-End Development</h2>
          <Button
            label='See more'
            hollow
            tiny
            blue
          />
        </div>

        <Row>
          <Col xs={6} md={3}>
            <div className={styles.box}>Web Architecture</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>UX Development</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>Interface Design</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>Prototyping</div>
          </Col>
        </Row>
      </div>
    )
  }
}
