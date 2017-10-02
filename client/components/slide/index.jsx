import React from 'react';
import cn from 'classnames';
import styles from './index.css';
import { Link } from 'react-router-dom';

const Slide = ({ className, label, labelClassName, icon, iconStyles, href, ...others }) => {
  const _className = cn(className, styles.default);
  const _labelClassName = cn(labelClassName, styles.label);
  const _iconStyles = cn(iconStyles, styles.icon);

  const Content = (
    <div className={_className}>
      <div className={_labelClassName}>{label}</div>
      <div className={_iconStyles}>{icon}</div>
    </div>
  )

  if (href === undefined) {
    return Content;
  }

  return (
    <Link to={href}>
      {Content}
    </Link>
  )
}

export default Slide;
