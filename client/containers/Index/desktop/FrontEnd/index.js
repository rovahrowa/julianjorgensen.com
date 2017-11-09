import React from 'react';
import Button from 'components/Button';
import CodeBasedDesignIcon from 'assets/icons/colored/code-based-design.svg';
import FastIcon from 'assets/icons/FontAwesome/light/bolt.svg';
import AnimationIcon from 'assets/icons/FontAwesome/light/braille.svg';
import OptimizedIcon from 'assets/icons/FontAwesome/light/braille.svg';
import styles from './index.css';

const items = [
  {
    title: 'Solid Stack',
    icon: <AnimationIcon />,
  },
  {
    title: 'CSS Architecture',
    icon: <CodeBasedDesignIcon className={styles.boxIcon} />,
  },
  {
    title: 'Speed Optimization',
    icon: <FastIcon />,
  },
  {
    title: 'High Precision',
    icon: <OptimizedIcon />,
  },
];

export default () => (
  <div className={styles.container} id="frontend">
    <div className={styles.header}>
      <h2 className={styles.title}>Front-End Development</h2>
      {/* <Button
        label="See more"
        hollow
        tiny
        className={styles.cta}
      /> */}
    </div>

    <div className={styles.boxes}>
      {items.map(item => (
        <div key={item.title} className={styles.boxWrapper}>
          <div className={styles.box}>
            <div className={styles.icon}>{item.icon}</div>
          </div>
          <div className={styles.boxLabel}>{item.title}</div>
        </div>
      ))}
    </div>
  </div>
);
