import * as redux from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';

import { siteReducer, navReducer } from './reducers';

export default (initialState = {}) => {
  const reducer = redux.combineReducers({
    site: siteReducer,
    nav: navReducer,
    form: formReducer,
  });

  const createStore = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return createStore;
}
