const CHANGE_USERNAME = 'Blipay/account/CHANGE_USERNAME';
const CHANGE_USERNAME_SUCC = 'Blipay/account/CHANGE_USERNAME_SUCC';
const CHANGE_USERNAME_FAIL = 'Blipay/account/CHANGE_USERNAME_FAIL';
const CHANGE_REALNAME = 'Blipay/account/CHANGE_REALNAME';
const CHANGE_REALNAME_SUCC = 'Blipay/account/CHANGE_REALNAME_SUCC';
const CHANGE_REALNAME_FAIL = 'Blipay/account/CHANGE_REALNAME_FAIL';
const CHANGE_ID = 'Blipay/account/CHANGE_ID';
const CHANGE_ID_SUCC = 'Blipay/account/CHANGE_ID_SUCC';
const CHANGE_ID_FAIL = 'Blipay/account/CHANGE_ID_FAIL';
const CHANGE_EMAIL = 'Blipay/account/CHANGE_EMAIL';
const CHANGE_EMAIL_SUCC = 'Blipay/account/CHANGE_EMAIL_SUCC';
const CHANGE_EMAIL_FAIL = 'Blipay/account/CHANGE_EMAIL_FAIL';
const CHANGE_PHONE = 'Blipay/account/CHANGE_PHONE';
const CHANGE_PHONE_SUCC = 'Blipay/account/CHANGE_PHONE_SUCC';
const CHANGE_PHONE_FAIL = 'Blipay/account/CHANGE_PHONE_FAIL';

const initialState = { };

const getErrorMsg = (code) => {
  switch (code) {
  case -1:
    return '用户查找失败。';
  case -2:
    return '服务器内部错误。';
  default:
    return '出现未知错误。';
  }
};

export default (state=initialState, action) => {
  switch (action.type) {
  case CHANGE_USERNAME:
    return {
      ...state,
      changingUserName: true,
      userNameError: null
    };
  case CHANGE_USERNAME_SUCC:
    return {
      ...state,
      changingUserName: false,
      userNameError: null
    };
  case CHANGE_USERNAME_FAIL:
    return {
      ...state,
      changingUserName: false,
      userNameError: getErrorMsg(action.error.code)
    };
  case CHANGE_REALNAME:
    return {
      ...state,
      realNameError: null,
      changingRealName: true
    };
  case CHANGE_REALNAME_SUCC:
    return {
      ...state,
      changingRealName: false,
      realNameError: null
    };
  case CHANGE_REALNAME_FAIL:
    return {
      ...state,
      changingRealName: false,
      realNameError: getErrorMsg(action.error.code)
    };
  case CHANGE_ID:
    return {
      ...state,
      changingId: true,
      idError: null
    };
  case CHANGE_ID_SUCC:
    return {
      ...state,
      changingId: false,
      idError: null
    };
  case CHANGE_ID_FAIL:
    return {
      ...state,
      changingId: false,
      idError: null
    };
  case CHANGE_EMAIL:
    return {
      ...state,
      changingEmail: true,
      emailError: null
    };
  case CHANGE_EMAIL_SUCC:
    return {
      ...state,
      changingEmail: false,
      emailError: null
    };
  case CHANGE_EMAIL_FAIL:
    return {
      ...state,
      changingEmail: false,
      emailError: getErrorMsg(action.error.code)
    };
  case CHANGE_PHONE:
    return {
      ...state,
      changingPhone: true,
      phoneError: null
    };
  case CHANGE_PHONE_SUCC:
    return {
      ...state,
      changingPhone: false,
      phoneError: null
    };
  case CHANGE_PHONE_FAIL:
    return {
      ...state,
      changingPhone: false,
      phoneError: getErrorMsg(action.error.code)
    };
  default:
    return state;
  }
};

export const changeUserName = (userId, userName) => {
  return {
    types: [
      CHANGE_USERNAME,
      CHANGE_USERNAME_SUCC,
      CHANGE_USERNAME_FAIL
    ],
    promise: (client) => {
      return client.post('/account/change_userName', {
        userId,
        userName
      });
    }
  };
};

export const changeRealName = (userId, realName) => {
  return {
    types: [
      CHANGE_REALNAME,
      CHANGE_REALNAME_SUCC,
      CHANGE_REALNAME_FAIL
    ],
    promise: (client) => {
      return client.post('/account/change_realName', {
        userId,
        realName
      });
    }
  };
};

export const changePhone = (userId, phone) => {
  return {
    types: [
      CHANGE_PHONE,
      CHANGE_PHONE_SUCC,
      CHANGE_PHONE_FAIL
    ],
    promise: (client) => {
      return client.post('/account/change_phone', {
        userId,
        phone
      });
    }
  };
};

export const changeEmail = (userId, email) => {
  return {
    types: [
      CHANGE_EMAIL,
      CHANGE_EMAIL_SUCC,
      CHANGE_EMAIL_FAIL
    ],
    promise: (client) => {
      return client.post('/account/change_email', {
        userId,
        email
      });
    }
  };
};

export const changeIdNumber = (userId, idNumber) => {
  return {
    types: [
      CHANGE_ID,
      CHANGE_ID_SUCC,
      CHANGE_ID_FAIL
    ],
    promise: (client) => {
      return client.post('/account/change_idNumber', {
        userId,
        idNumber
      });
    }
  };
};
