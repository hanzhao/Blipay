import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import logout from './logout';
import query from './query';

export default combineReducers({
  register, 
  login,
  logout,
  query
});