import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import styles from './styles/app.css';
import fonts from './fonts/fonts.css';

let store = require('configureStore').configure();
import router from './router/router.jsx';


// subscribe to the redux store
store.subscribe(() => {
  let state = store.getState();
  console.log('New state', state);
});

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
