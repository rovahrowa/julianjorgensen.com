import React from 'react';
import cn from 'classnames';
import PlayIcon from '-!svg-react-loader?name=Icon!assets/icons/FontAwesome/solid/play-circle.svg';
import styles from './index.css';

export default class HomeLandingMobileSlide extends React.Component {
  render() {
    let { title, content, className, playButtonClassName, titleClassName } = this.props;
    let _slideStyles = cn(styles.slide, className);
    let _headerStyles = cn(styles.header, titleClassName);
    let _playButtonStyles = cn(styles.play, playButtonClassName);
    return (
      <div className={_slideStyles}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1 className={_headerStyles}>{title}</h1>
            {content}
          </div>
          <div className={_playButtonStyles} onClick={() => alert('play video')}><PlayIcon /></div>
        </div>
      </div>
    )
  }
}
