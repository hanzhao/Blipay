const LOGIN = 'Blipay/account/LOGIN';
const LOGIN_SUCC = 'Blipay/account/LOGIN_SUCC';
const LOGIN_FAIL = 'Blipay/account/LOGIN_FAIL';

const initialState = {
  loggingIn: false,
  errorMsg: null
};

export default (state = initialState, action) => {
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
      return {
        loggingIn: false,
        errorMsg: action.error.message
      };
    default:
      return state;
  }
};

export const login = (userName, password) => {
  console.log({
    userName: userName,
    password: password
  })
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
        password
      })
    }
  };
};
