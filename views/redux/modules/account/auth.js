const LOGIN = 'Blipay/account/LOGIN';
const LOGIN_SUCC = 'Blipay/account/LOGIN_SUCC';
const LOGIN_FAIL = 'Blipay/account/LOGIN_FAIL';
const LOGOUT = 'Blipay/account/LOGOUT';
const LOGOUT_SUCC = 'Blipay/account/LOGOUT_SUCC';
const LOGOUT_FAIL = 'Blipay/account/LOGOUT_FAIL';

const initialState = {
  loggingIn: false,
  errorMsg: null
}

export default (state=initialState, action) => {
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
    console.log(action);
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
    return {
      ...state,
      loggingOut: false,
      loggedIn: false,
      userId: null
    };
  case LOGIN_FAIL:
    return {
      loggingOut: false,
      loggedIn: true
    };
  default:
    return state;
  }
}

export const isLoggedIn = (globalState) => {
  return globalState.account && 
         globalState.account.auth &&
         globalState.account.auth.userId;
}

export const login = (userName, loginPass) => {
  return {
    types: [LOGIN, LOGIN_SUCC, LOGIN_FAIL],
    promise: (client) => {
      return client.post('/account/login', {
        userName,
        loginPass
      });
    }
  }
}

export const logout = () => {
  return {
    types: [LOGOUT, LOGOUT_SUCC, LOGOUT_FAIL],
    promise: (client) => {
      return clent.post('/account/logout');
    }
  };
}
