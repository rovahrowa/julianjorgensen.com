import React from 'react';
import { Parallax, Background } from 'react-parallax';
import Button from 'components/Button';
import codeBg from 'assets/images/code-bg.jpg';
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
  <div id="fullstack">
    <Parallax className={styles.wrapper} strength={300}>
      <Background>
        <div style={{ backgroundImage: `url(${codeBg})` }} className={styles.codeBg} />
      </Background>

      <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Full-Stack Development</h2>
        {/* <Button
          label="See more"
          hollow
          tiny
          className={styles.cta}
        /> */}
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
    </Parallax>
  </div>
);
