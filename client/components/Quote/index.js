import React, { Component } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import VisibilitySensor from 'react-visibility-sensor';
import styles from './index.css';

export default class Quote extends Component {
  state = {
    show: false,
  }

  render() {
    const {
      className,
      body,
      quoteClassName,
      authorImage,
      authorImageClassName,
      authorClassName,
      author,
      authorTitle,
      href,
    } = this.props;

    const wrapperStyles = cn(className, styles.container);
    const authorImageStyles = cn(authorImageClassName, styles.authorImage);
    const authorStyles = cn(authorClassName, styles.author);
    const quoteStyles = cn(quoteClassName, styles.quote);

    const Author = (
      <author className={authorStyles}>
        <div className={authorImageStyles} style={{ backgroundImage: `url(${authorImage})` }} />
        <div className={styles.meta}>
          <div className={styles.name}>{author}</div>
          <div className={styles.title}>{authorTitle}</div>
        </div>
      </author>
    );

    return (
      <div className={wrapperStyles}>
        <q className={quoteStyles}>{body}</q>
        { href === undefined ? Author : <Link to={href}>{Author}</Link> }
      </div>
    );
  }
}
