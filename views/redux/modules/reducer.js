import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import account from './account/index';
import auditor from './auditor/index';


export default combineReducers({
  account,
  routing,
  form,
  auditor
});
