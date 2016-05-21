import { combineReducers } from 'redux';
import register from './register';
import auth from './auth';
import paypass from './paypass';
import loginpass from './loginpass';
import transaction from './transaction';
import topup from './topup';
import withdraw from './withdraw';
import info from './info';

export default combineReducers({
  auth,
  register,
  paypass,
  loginpass,
  transaction,
  topup,
  withdraw,
  info
});
