import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './index.css';

export default class Quote extends Component {
  state = {
    show: false,
  }

  onVisibilityChange = (isVisible) => {
    if (isVisible) {
      this.setState({
        show: true,
      });
    } else {
      this.setState({
        show: false,
      });
    }
  };

  render() {
    const {
      className,
      body,
      quoteClassName,
      avatarImage,
      avatarClassName,
      authorClassName,
      author,
      authorTitle,
      href,
    } = this.props;

    const wrapperStyles = cn(className, styles.container, {
      [styles.show]: this.state.show,
    });
    const avatarStyles = cn(avatarClassName, styles.avatar);
    const authorStyles = cn(authorClassName, styles.author);
    const quoteStyles = cn(quoteClassName, styles.quote);

    const Author = (
      <author className={authorStyles}>
        <div className={avatarStyles} style={{ backgroundImage: avatarImage }} />
        <div className={styles.meta}>
          <div className={styles.name}>{author}</div>
          <div className={styles.title}>{authorTitle}</div>
        </div>
      </author>
    );

    return (
      <VisibilitySensor
        partialVisibility
        offset={{ top: 50, bottom: 50 }}
        onChange={this.onVisibilityChange}
      >
        <div className={wrapperStyles}>
          <q className={quoteStyles}>{body}</q>
          { href === undefined ? Author : <Link to={href}>{Author}</Link> }
        </div>
      </VisibilitySensor>
    );
  }
}
