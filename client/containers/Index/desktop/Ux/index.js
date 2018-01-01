import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import UxBoxes from './components/UxBoxes';

export default () => {
  return (
    <div id="ux">
      <Parallax>
        {({ isInView, progress }) => <UxBoxes progress={progress} isInView={isInView} /> }
      </Parallax>
    </div>
  );
};

