import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

import rootReducer from 'reducers';

const loggerMiddleware = logger();

const middleware = [
  thunkMiddleware,
  loggerMiddleware
];

const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
