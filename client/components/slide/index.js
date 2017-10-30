import React from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './index.css';

export default ({
  className, label, labelClassName, icon, iconStyles, href, ...others
}) => {
  const wrapperStyles = cn(className, styles.default);
  const labelStyles = cn(labelClassName, styles.label);
  const combinedIconStyles = cn(iconStyles, styles.icon);

  const Content = (
    <div className={wrapperStyles}>
      <div className={labelStyles}>{label}</div>
      <div className={combinedIconStyles}>{icon}</div>
    </div>
  );

  if (href === undefined) {
    return Content;
  }

  return (
    <Link to={href}>
      {Content}
    </Link>
  );
};
