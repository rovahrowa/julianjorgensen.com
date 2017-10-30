import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import styles from './index.css';

@connect(({ scrollPosition }) => ({
  scroll: scrollPosition.y,
}))
export default class Marquee extends React.Component {
  render() {
    const {
      title, className, scroll, light,
    } = this.props;

    const wrapperStyles = cn(className, styles.wrapper);
    const topBlockStyles = cn(styles.topBlock, {
      [styles.light]: light,
    });
    const bottomBlockStyles = cn(styles.bottomBlock, {
      [styles.light]: light,
    });
    
    const headerMarginBottom = -scroll;
    const headerOpacity = 0.08 - (scroll / 1000);

    return (
      <div className={wrapperStyles}>
        <div className={topBlockStyles} />
        <div className={styles.marquee} style={{ opacity: headerOpacity }}>
          <h1 className={styles.header} style={{ marginBottom: headerMarginBottom }}>{title}</h1>
        </div>
        <div className={bottomBlockStyles} />
      </div>
    );
  }
}
