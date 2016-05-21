import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducer from './modules/reducer';
import ajax from '../common/ajax';

function ajaxMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      if (action === undefined) {
        return next(action);
      }
      const { promise, types, ...rest } = action;
      if (!promise) {
        return next(action);
      }
      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});
      const actionPromise = promise(client);
      actionPromise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
      return actionPromise;
    };
  };
}

const _ajaxMiddleware = ajaxMiddleware(ajax);
const _routerMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  reducer, compose(
    applyMiddleware(_ajaxMiddleware, _routerMiddleware),
    process.env.NODE_ENV === 'development' && window.devToolsExtension ?
    window.devToolsExtension() : f => f
  )
);

export default store;
