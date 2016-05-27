import { combineReducers } from 'redux';
import auth from './auth';
import query from './query';

export default combineReducers({
  auth,
  query
});
