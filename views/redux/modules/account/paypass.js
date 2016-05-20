const ENTER_CHENGE_PAYPASS = 'Blipay/account/ENTER_CHENGE_PAYPASS';
const EXIT_CHANGE_PAYPASS = 'Blipay/account/EXIT_CHANGE_PAYPASS';
const CHANGE_PAYPASS = 'Blipay/account/CHANGE_PAYPASS';
const CHANGE_PAYPASS_SUCC = 'Blipay/account/CHANGE_PAYPASS_SUCC';
const CHANGE_PAYPASS_FAIL = 'Blipay/account/CHANGE_PAYPASS_FAIL';

const initialState = {
  changingPaypass: false,
  requesting: false,
  errorMsg: null
};

export default (state = initialState, action) => {
  let msg;
  switch (action.type) {
  case ENTER_CHENGE_PAYPASS:
    return {
      changingPaypass: true
    };
  case EXIT_CHANGE_PAYPASS:
    return {
      changingPaypass: false
    };
  case CHANGE_PAYPASS:
    return {
      changingPaypass: true,
      requesting: true
    };
  case CHANGE_PAYPASS_SUCC:
    return {
      changingPaypass: false,
      requesting: false
    };
  case CHANGE_PAYPASS_FAIL:
    switch (action.error.code) {
    case -1:
      msg = '用户ID不存在。';
      break;
    case -2:
      msg = '服务器内部错误。';
      break;
    default:
      msg = '出现未知错误。';
      break;
    }
    return {
      changingPaypass: true,
      requesting: false,
      errorMsg: msg
    };
  default:
    return state;
  }
};

export const enterChangePaypass = () => {
  return {
    type: ENTER_CHENGE_PAYPASS
  };
};

export const exitChangePaypass = () => {
  return {
    type: EXIT_CHANGE_PAYPASS
  };
};

export const changePaypass = (userId, newPaypass) => {
  return {
    types: [
      CHANGE_PAYPASS,
      CHANGE_PAYPASS_SUCC,
      CHANGE_PAYPASS_FAIL
    ],
    promise: (client) => {
      return client.post('/account/change_paypass', {
        userId: userId,
        payPass: newPaypass
      });
    }
  };
};
