import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { reducer as form } from 'redux-form';
import account from './account';
import shopping from './shopping';
import admin from './admin';

export default combineReducers({
  routing,
  form,
  reduxAsyncConnect,
  account,
  shopping,
  admin
});
