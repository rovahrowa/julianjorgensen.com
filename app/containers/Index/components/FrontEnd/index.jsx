import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import styles from './index.css';

import CodeBasedDesignIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/code-based-design.svg';

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
            <div className={styles.box}>
              <CodeBasedDesignIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>Code-based design</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>
              <CodeBasedDesignIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>Animations</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>
              <CodeBasedDesignIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>Ultra fast</div>
          </Col>
          <Col xs={6} md={3}>
            <div className={styles.box}>
              <CodeBasedDesignIcon className={styles.boxIcon} />
            </div>
            <div className={styles.boxLabel}>Optimized for everybody</div>
          </Col>
        </Row>
      </div>
    )
  }
}
