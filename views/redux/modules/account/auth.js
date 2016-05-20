import { 
  updateTransaction,
  resetTransaction
} from './transaction';
import {
  updateBalance,
  updateUserName,
  updateRealName,
  updatePhone,
  updateEmail,
  updateIdNumber,
  updateLastLogin,
  resetInfo
} from './info';
import { push } from 'react-router-redux'; 

import store from '../../store';

const LOGIN = 'Blipay/account/LOGIN';
const LOGIN_SUCC = 'Blipay/account/LOGIN_SUCC';
const LOGIN_FAIL = 'Blipay/account/LOGIN_FAIL';
const LOGOUT = 'Blipay/account/LOGOUT';
const LOGOUT_SUCC = 'Blipay/account/LOGOUT_SUCC';
const LOGOUT_FAIL = 'Blipay/account/LOGOUT_FAIL';
const UPDATE_USERID = 'Blipay/account/UPDATE_USERID';

const initialState = {
  loggingIn: false,
  errorMsg: null
};

export default (state = initialState, action) => {
  let msg;
  switch(action.type) {
  case LOGIN:
    return {
      ...state,
      loggingIn: true,
      loggedIn: false,
      errorMsg: null
    };
  case LOGIN_SUCC:
    setTimeout(() => {
      store.dispatch(updateTransaction(action.result.userId));
      store.dispatch(updateUserName(action.result.userName));
      store.dispatch(updateRealName(action.result.realName));
      store.dispatch(updateBalance(action.result.balance));
      store.dispatch(updateEmail(action.result.email));
      store.dispatch(updatePhone(action.result.phone));
      store.dispatch(updateLastLogin(
        action.result.lastLogin.replace(',', ' ')
      ));
      store.dispatch(updateIdNumber(action.result.idNumber));
      store.dispatch(push('/account'));
    }, 10);

    return {
      ...state,
      loggingIn: false,
      loggedIn: true,
      userId: action.result.userId,
      errorMsg: null
    };
  case LOGIN_FAIL:
    switch(action.error.code) {
    case -1:
      msg = '用户名未被注册。';
      break;
    case -2:
      msg = '服务器内部错误。';
      break;
    case -3:
      msg = '登录密码有误。';
      break;
    default:
      msg = '出现未知错误。';
      break;
    }
    return {
      ...state,
      loggingIn: false,
      loggedIn: false,
      errorMsg: msg
    };
  case LOGOUT:
    return {
      ...state,
      loggingOut: true,
      errorMsg: null
    };
  case LOGOUT_SUCC:
    setTimeout(() => {
      store.dispatch(resetInfo());
      store.dispatch(resetTransaction());
      store.dispatch(push('/'));
    }, 10);
    return {
      ...state,
      loggingOut: false,
      loggedIn: false,
      userId: null
    };
  case LOGOUT_FAIL:
    return {
      loggingOut: false,
      loggedIn: true
    };
  case UPDATE_USERID:
    return {
      ...state,
      userId: action.userId,
      isLoggedIn: true
    };
  default:
    return state;
  }
};

export const isLoggedIn = (globalState) => {
  return globalState.account && 
         globalState.account.auth &&
         globalState.account.auth.userId;
};

export const login = (userName, loginPass) => {
  return {
    types: [LOGIN, LOGIN_SUCC, LOGIN_FAIL],
    promise: (client) => {
      return client.post('/account/login', {
        userName,
        loginPass
      });
    }
  };
};

export const logout = () => {
  return {
    types: [LOGOUT, LOGOUT_SUCC, LOGOUT_FAIL],
    promise: (client) => {
      return client.post('/account/logout');
    }
  };
};

export const getUserId = (globalState) => {
  if (globalState.account &&
      globalState.account.auth)
    return globalState.account.auth.userId;
  else
    return undefined;
};

export const getErrorMsg = (globalState) => {
  if (globalState.account &&
      globalState.account.auth)
    return globalState.account.auth.errorMsg;
  else
    return undefined;
};

export const updateUserId = (userId) => {
  return {
    type: UPDATE_USERID,
    userId
  };
};
