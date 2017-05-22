import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import styles from './styles/app.css';
import fonts from './fonts/fonts.css';

let store = require('configureStore').configure();
import main from './components/Main';

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
