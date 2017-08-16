import React from 'react';
import cn from 'classnames';
import styles from './index.css';
import { Link } from 'react-router-dom';

const Quote = ({ className, body, quoteClassName, avatarUrl, avatarClassName, authorClassName, author, authorTitle, href, ...others }) => {
  const _className = cn(className, styles.container);
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
  )

  return (
    <div className={_className}>
      <q className={_quoteClassName}>{body}</q>

      { href === undefined ? Author : <Link to={href}>{Author}</Link> }
    </div>
  )
}

export default Quote;
