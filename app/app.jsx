import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import styles from './styles/app.css';

import store from 'store';
import main from 'layout';

// subscribe to the redux store
store.subscribe(() => {
  let state = store.getState();
  console.log('New state', state);
});

ReactDOM.render(
  <Provider store={store}>
    {main}
  </Provider>,
  document.getElementById('app')
);
