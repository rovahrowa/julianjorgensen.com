import * as redux from 'redux';
import thunk from 'redux-thunk';

import { siteReducer, navReducer, scrollReducer } from './reducers';

export default (initialState = {}) => {
  const reducer = redux.combineReducers({
    site: siteReducer,
    nav: navReducer,
    scrollPosition: scrollReducer,
  });

  const createStore = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return createStore;
}
