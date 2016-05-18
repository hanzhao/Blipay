const ENTER_CHANGE_LOGINPASS = 'Blipay/account/ENTER_CHANGE_LOGINPASS';
const EXIT_CHANGE_LOGINPASS = 'Blipay/account/EXIT_CHANGE_LOGINPASS';
const CHANGE_LOGINPASS = 'Blipay/account/CHANGE_LOGINPASS';
const CHANGE_LOGINPASS_SUCC = 'Blipay/account/CHANGE_LOGINPASS_SUCC';
const CHANGE_LOGINPASS_FAIL = 'Blipay/account/CHANGE_LOGINPASS_FAIL';

const initialSate = {
  changingLoginpass: false,
  requesting: false,
  errorMsg: null
};

export default (state=initialSate, action) => {
  let msg;
  switch (action.type) {
    case ENTER_CHANGE_LOGINPASS:
      return {
        changingLoginpass: true
      };
    case EXIT_CHANGE_LOGINPASS:
      return {
        changingLoginpass: false
      };
    case CHANGE_LOGINPASS:
      return {
        changingLoginpass: true,
        requesting: true
      };
    case CHANGE_LOGINPASS_SUCC:
      return {
        changingLoginpass: false,
        requesting: false
      };
    case CHANGE_LOGINPASS_FAIL:
      switch (action.error.code) {
      case -1:
        msg = "用户ID不存在。";
        break;
      case -2:
        msg = "服务器内部错误。";
        break;
      default:
        msg = "出现位置错误。";
        break;
      }
      return {
        changingLoginpass: true,
        requesting: false,
        errorMsg: msg
      };
    default:
      return state;
  }
};

export const enterChangeLoginpass = () => {
  return {
    type: ENTER_CHANGE_LOGINPASS
  };
};

export const exitChangeLoginpass = () => {
  return {
    type: EXIT_CHANGE_LOGINPASS
  };
};

export const changeLoginpass = (userId, newLoginpass) => {
  return {
    types: [
      CHANGE_LOGINPASS,
      CHANGE_LOGINPASS_SUCC,
      CHANGE_LOGINPASS_FAIL
    ],
    promise: (client) => {
      return client.post('/account/change_loginpass', {
        userId: userId,
        loginPass: newLoginpass
      });
    }
  };
};
