const LOGIN = 'Blipay/auditor/LOGIN';
const LOGIN_SUCC = 'Blipay/auditor/LOGIN_SUCC';
const LOGIN_FAIL = 'Blipay/auditor/LOGIN_FAIL';
const LOGOUT = 'Blipay/auditor/LOGOUT';
const LOGOUT_SUCC = 'Blipay/auditor/LOGOUT_SUCC';
const LOGOUT_FAIL = 'Blipay/auditor/LOGOUT_FAIL';


const initialState = {
  loggingIn: false,
  errorMsg: null,
  transactions: []
};



const getDate = (str) => {
  return str.replace('T', ' ').replace('.000Z', '');
};

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
      msg = '审计员账户错误。';
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
};

export const AuditorisLoggedIn = (globalState) => {
  return globalState.auditor && 
         globalState.auditor.auth &&
         globalState.auditor.auth.userId;
};

export const Auditorlogin = (userName, loginPass) => {
  return {
    types: [LOGIN, LOGIN_SUCC, LOGIN_FAIL],
    promise: (client) => {
      return client.post('/auditor/login', {
        userName,
        loginPass
      });
    }
  }
};

export const Auditorlogout = () => {
  return {
    types: [LOGOUT, LOGOUT_SUCC, LOGOUT_FAIL],
    promise: (client) => {
      return clent.post('/auditor/logout');
    }
  };
};

export const AuditorgetUserId = (globalState) => {
  if (globalState.auditor &&
      globalState.auditor.auth)
    return globalState.auditor.auth.userId;
  else
    return undefined;
};

export const AuditorgetErrorMsg = (globalState) => {
  if (globalState.auditor &&
      globalState.auditor.auth)
    return globalState.auditor.auth.errorMsg;
  else
    return undefined;
};

