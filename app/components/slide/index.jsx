import React from 'react';
import cn from 'classnames';
import styles from './index.css';
import { Link } from 'react-router-dom';

const Slide = ({ className, label, labelClassName, href, ...others }) => {
  const _className = cn(className, styles.default);
  const _labelClassName = cn(labelClassName, styles.label);

  const Content = (
    <div className={_className}>
      <div className={_labelClassName}>{label}</div>
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
