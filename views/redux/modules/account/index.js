import { combineReducers } from 'redux';
import register from './register';
import login from './login';

export default combineReducers({
  register, 
  login
});
