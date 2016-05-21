import { combineReducers } from 'redux';
import register from './register';
import auth from './auth';
import paypass from './paypass';
import loginpass from './loginpass';
import query from './query';
import topup from './topup';
import withdraw from './withdraw';
import info from './info';

export default combineReducers({
  auth,
  register, 
  paypass,
  loginpass,
  query,
  topup,
  withdraw,
  info
});
