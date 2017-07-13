import * as redux from 'redux';
import thunk from 'redux-thunk';

import {navReducer, invoiceReducer, scrollReducer} from 'reducers';

export let configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    nav: navReducer,
    invoice: invoiceReducer,
    scrollPosition: scrollReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
