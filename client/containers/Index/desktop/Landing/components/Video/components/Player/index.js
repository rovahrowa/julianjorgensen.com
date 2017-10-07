import React from 'react';
import { asyncComponent } from 'react-async-component';
import LoadingSpinner from 'components/LoadingSpinner';

export default asyncComponent({
  resolve: () => new Promise(resolve =>
    // Webpack's code splitting API w/naming
    require.ensure(
      [],
      (require) => {
        resolve(require('./Player'));
      },
      'YoutubePlayer'
    )
  ),
  LoadingComponent: () => <LoadingSpinner />
});
