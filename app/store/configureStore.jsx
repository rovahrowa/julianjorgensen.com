import * as redux from 'redux';
import thunk from 'redux-thunk';

import {navReducer} from 'reducers';
import {invoiceReducer} from 'reducers';

export let configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    nav: navReducer,
    invoice: invoiceReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
