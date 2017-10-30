import React from 'react';
import cn from 'classnames';
import LogoSVG from 'assets/icons/julian-jorgensen-logo.svg';

export default ({
  className, color, size, ...others
}) => {
  const wrapperStyles = cn(className);

  return (
    <LogoSVG
      className={wrapperStyles}
      {...others}
    />
  );
};
