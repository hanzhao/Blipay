import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import logout from './logout';
import auth from './auth';

export default combineReducers({
  auth,
  register, 
  login,
  logout
});
