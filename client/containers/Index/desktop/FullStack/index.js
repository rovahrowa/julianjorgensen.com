import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import Button from 'components/Button';
import ScaleIcon from 'assets/icons/FontAwesome/regular/expand.svg';
import APIIcon from 'assets/icons/FontAwesome/regular/code.svg';
import DatabaseIcon from 'assets/icons/colored/cms-icon.svg';
import AutomationIcon from 'assets/icons/colored/automation.svg';
import styles from './index.css';

const items = [
  {
    title: 'Scalable',
    className: styles.scalable,
    icon: <ScaleIcon />,
  },
  {
    title: 'API integrations',
    className: styles.api,
    icon: <APIIcon />,
  },
  {
    title: 'Automations',
    className: styles.automation,
    icon: <AutomationIcon />,
  },
  {
    title: 'Cloud-based Databases',
    className: styles.database,
    icon: <DatabaseIcon />,
  },
];

export default () => (
  <div className={styles.wrapper} id="fullstack">
    <Parallax
      className={styles.parallaxBg}
      offsetYMax={10}
      offsetYMin={-50}
      slowerScrollRate
      tag="div"
    >
      <img src="/images/code-bg.jpg" className={styles.codeBg} alt="Code background" />
    </Parallax>

    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Full-Stack Development</h2>
        <Button
          label="See more"
          hollow
          tiny
          className={styles.cta}
        />
      </div>

      <div className={styles.boxes}>
        {
          items.map(item => (
            <div key={item.title} className={`${styles.boxWrapper} ${item.className}`}>
              <div className={styles.box}>
                <div className={styles.icon}>{item.icon}</div>
              </div>
              <div className={styles.boxLabel}>{item.title}</div>
            </div>
          ))
        }
      </div>
    </div>
  </div>
);
