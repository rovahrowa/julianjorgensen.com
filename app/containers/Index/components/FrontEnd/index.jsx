import React from 'react';
import { Parallax } from 'lib/react-scroll-parallax';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Button from 'components/Button';

import styles from './index.css';

import CodeBasedDesignIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/code-based-design.svg';

let items = [
  {
    title: 'Code-based design'
  },
  {
    title: 'Animations'
  },
  {
    title: 'Ultra fast'
  },
  {
    title: 'Optimized for everybody'
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
            blue
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
                    <CodeBasedDesignIcon className={styles.boxIcon} />
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
