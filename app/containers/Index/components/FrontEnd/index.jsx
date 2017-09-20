import React from 'react';
import { Parallax } from 'lib/react-scroll-parallax';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import styles from './index.css';

import CodeBasedDesignIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/code-based-design.svg';
import FastIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/light/bolt.svg';
import AnimationIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/light/braille.svg';
import OptimizedIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/light/braille.svg';

let items = [
  {
    title: 'Code-based design',
    icon: <CodeBasedDesignIcon className={styles.boxIcon} />
  },
  {
    title: 'Animations',
    icon: <AnimationIcon />
  },
  {
    title: 'Lightning fast',
    icon: <FastIcon />
  },
  {
    title: 'Optimized for everybody',
    icon: <OptimizedIcon />
  }
];

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
            className={styles.cta}
          />
        </div>

        <Row>
        {
          items.map((item, i) => {
            let fadeSpeed = 1.55-(i/10);
            return (      
              <Col key={i} xs={6} md={3}>

              <Parallax
              offsetYMin={-3}
              offsetYMax={6}
              fadeSpeed={fadeSpeed}
              // slowerScrollRate
              tag="div"
            >
                <div className={styles.box}>
                    <div className={styles.icon}>{item.icon}</div>
                  </div>
                  <div className={styles.boxLabel}>{item.title}</div>
                  </Parallax>        
                  </Col>
            )
          })
        }
        </Row>
        </div>
    )
  }
}
