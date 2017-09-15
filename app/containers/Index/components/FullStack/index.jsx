import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { Parallax } from 'react-scroll-parallax';
import Button from 'components/Button';


import ScaleIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/expand.svg';
import APIIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/regular/code.svg';
import DatabaseIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/cms-icon.svg';
import AutomationIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/automation.svg';

import styles from './index.css';

let items = [
  {
    title: 'Scalable',
    className: styles.scalable,
    icon: <ScaleIcon />
  },
  {
    title: 'API integrations',
    className: styles.api,
    icon: <APIIcon />
  },
  {
    title: 'Automations',
    className: styles.automation,
    icon: <AutomationIcon />
  },
  {
    title: 'Cloud-based Databases',
    className: styles.database,
    icon: <DatabaseIcon />
  }
];

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
          <img src='/images/code-bg.jpg' className={styles.codeBg} />
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
          {
            items.map((item, i) => {
              return (
                <Col key={i} xs={6} md={3} className={item.className}>
                  <div className={styles.box}>
                    <div className={styles.icon}>{item.icon}</div>
                  </div>
                  <div className={styles.boxLabel}>{item.title}</div>
                </Col>  
              )
            })
          }
          </Row>
        </div>
      </div>
    )
  }
}
