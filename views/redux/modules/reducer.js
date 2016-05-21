import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import account from './account/index';
import shopping from './shopping';

export default combineReducers({
  account,
  routing,
  form,
  shopping
});
