import React from 'react';
import cn from 'classnames';
import { withScroll } from 'react-window-decorators';
import styles from './index.css';

@withScroll
export default class Marquee extends React.Component {
  render() {
    const {
      title, className, scrollPosition, light,
    } = this.props;

    const wrapperStyles = cn(className, styles.wrapper);
    const topBlockStyles = cn(styles.topBlock, {
      [styles.light]: light,
    });
    const bottomBlockStyles = cn(styles.bottomBlock, {
      [styles.light]: light,
    });

    const headerMarginBottom = -scrollPosition;
    const headerOpacity = 0.08 - (scrollPosition / 1000);

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
