import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import WebArchitectureIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/wireframing.svg';
import UXIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/sketch.svg';
import DesignIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/ab-testing.svg';
import PrototypingIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/prototyping.svg';

import styles from './index.css';

export default class HomeUx extends React.Component{
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>User Experience</h2>
          <Button
            label='See more'
            hollow
            tiny
            blue
          />
        </div>

        <Row>
          <Col xs={6} md={3}>
            <div className={styles.box}>
              <WebArchitectureIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>Web Architecture</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>
              <UXIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>UX Development</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>
              <DesignIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>Interface Design</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>
              <PrototypingIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>Prototyping</div>
          </Col>
        </Row>
      </div>
    )
  }
}
