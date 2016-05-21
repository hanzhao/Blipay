import store from '../../store';
import { 
  updateUserId,
  updateUserName,
  updateLastLogin
} from './auth';
import { push } from 'react-router-redux'; 

const REGISTER = 'Blipay/account/REGISTER';
const REGISTER_SUCC = 'Blipay/account/REGISTER_SUCC';
const REGISTER_FAIL = 'Blipay/account/REGISTER_FAIL';

const initialState = {
  registering: true,
  errorMsg: null
};

export default (state = initialState, action) => {
  switch(action.type) {
  case REGISTER:
    return {
      registering: true
    };
  case REGISTER_SUCC:
    setTimeout(() => {
      store.dispatch(updateUserId(action.result.userId));
    }, 100);
    setTimeout(() => {
      store.dispatch(updateUserName(action.result.userName));
    }, 150);
    setTimeout(() => {
      store.dispatch(updateLastLogin( (new Date()).toLocaleString().replace(',', ' ') ));
    }, 200);
    setTimeout(() => {
      store.dispatch(push('/account'));
    }, 250);
    return {
      registering: false
    };
  case REGISTER_FAIL:
    return {
      registering: false,
      errorMsg: action.error.message
    };
  default:
    return state;
  }
};

export const register = (userName, loginPass, payPass) => {
  return {
    types: [
      REGISTER,
      REGISTER_SUCC,
      REGISTER_FAIL
    ],
    promise: (client) => {
      console.log('in promise');
      return client.post('/account/register', {
        userName,
        loginPass,
        payPass
      });
    }
  };
};
