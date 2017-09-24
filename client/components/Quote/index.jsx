import React from 'react';
import cn from 'classnames';
import styles from './index.css';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';

export default class Quote extends React.Component{
  state = {
    show: false
  }

  onVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.setState({
        show: true
      });
    }else{
      this.setState({
        show: false
      });
    }
  };

  render() {
    let { className, body, quoteClassName, avatarUrl, avatarClassName, authorClassName, author, authorTitle, href, ...others } = this.props;

    const _className = cn(className, styles.container, {
      [styles.show]: this.state.show
    });
    const _avatarClassName = cn(avatarClassName, styles.avatar);
    const _authorClassName = cn(authorClassName, styles.author);
    const _quoteClassName = cn(quoteClassName, styles.quote);

    const Author = (
      <author className={_authorClassName}>
        <div className={_avatarClassName} style={{backgroundImage: `url(${avatarUrl})`}} />
        <div className={styles.meta}>
          <div className={styles.name}>{author}</div>
          <div className={styles.title}>{authorTitle}</div>
        </div>
      </author>
    );

    return (
      <VisibilitySensor partialVisibility={true} offset={{top:50, bottom: 50}} onChange={this.onVisibilityChange}>
        <div className={_className}>
          <q className={_quoteClassName}>{body}</q>
          { href === undefined ? Author : <Link to={href}>{Author}</Link> }
        </div>
      </VisibilitySensor>
    )
  }
}
