const LOGIN = 'Blipay/account/LOGIN';
const LOGIN_SUCC = 'Blipay/account/LOGIN_SUCC';
const LOGIN_FAIL = 'Blipay/account/LOGIN_FAIL';

const initialState = {
  loggingIn: false,
  errorMsg: null
};

export default (state = initialState, action) => {
  let msg;
  switch(action.type) {
  case LOGIN:
    return {
      loggingIn: true
    };
  case LOGIN_SUCC:
    return {
      loggingIn: false
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
      loggingIn: false,
      errorMsg: msg
    };
  default:
    return state;
  }
};

export const login = (userName, loginPass) => {
  return {
    types: [
      LOGIN,
      LOGIN_SUCC,
      LOGIN_FAIL
    ],
    promise: (client) => {
      console.log('in login promise');
      return client.post('/account/login', {
        userName,
        loginPass
      });
    }
  };
};
