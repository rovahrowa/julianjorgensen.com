import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';
import UxBoxes from './components/UxBoxes';

export default () => (
  <div id="ux">
    <VisibilitySensor partialVisibility>
      {({ isVisible }) =>
        <UxBoxes isVisible={isVisible} />
      }
    </VisibilitySensor>
  </div>
);
