import React from 'react';
import cn from 'classnames';
import styles from './index.css';

export default class HomeLandingMobileSlide extends React.Component {
  render() {
    let { title, content, className, playButtonClassName, titleClassName, videoIsLoading } = this.props;
    let _slideStyles = cn(styles.slide, className);
    let _headerStyles = cn(styles.header, titleClassName);
    return (
      <div className={_slideStyles}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={_headerStyles}>{title}</h1>
            {content}
          </div>
        </div>
      </div>
    )
  }
}
