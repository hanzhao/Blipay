import { combineReducers } from 'redux';
import register from './register';
import login from './login';
import logout from './logout';
import auth from './auth';
import changePaypass from './changePaypass';
import changeLoginpass from './changeLoginpass';

export default combineReducers({
  auth,
  register, 
  login,
  logout,
  changePaypass,
  changeLoginpass
});
