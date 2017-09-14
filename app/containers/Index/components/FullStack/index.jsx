import React from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { Parallax } from 'react-scroll-parallax';
import Button from 'components/Button';

import CodeBasedDesignIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/code-based-design.svg';
import CMSIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/cms-icon.svg';
import AutomationIcon from '-!svg-react-loader?name=Icon!assets/icons/colored/automation.svg';

import styles from './index.css';

let items = [
  {
    title: 'Scalable',
    icon: <div className={styles.scalableIcon}></div>
  },
  {
    title: 'API integrations',
    icon: <CodeBasedDesignIcon className={styles.boxIcon} />
  },
  {
    title: 'Automation',
    icon: <AutomationIcon className={styles.boxIcon} />
  },
  {
    title: 'Cloud based CMS',
    icon: <CMSIcon className={styles.boxIcon} />
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
                <Col key={i} xs={6} md={3}>
                  <div className={styles.box}>
                    {item.icon}
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
