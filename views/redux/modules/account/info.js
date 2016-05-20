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
const UPDATE_BALANCE = 'Blipay/account/UPDATE_BALANCE';
const UPDATE_USERNAME = 'Blipay/account/UPDATE_USERNAME';
const UPDATE_EMAIL = 'Blipay/account/UPDATE_EMAIL';
const UPDATE_IDNUMBER = 'Blipay/account/UPDATE_IDNUMBER';
const UPDATE_PHONE = 'Blipay/account/UPDATE_PHONE';
const UPDATE_REALNAME = 'Blipay/account/UPDATE_REALNAME';
const UPDATE_LASTLOGIN = 'Blipay/account/UPDATE_LASTLOGIN';
const RESET_INFO = 'Blipay/account/RESET_INFO';

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

export default (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_USERNAME:
    return {
      ...state,
      requestingUserName: true,
      changingUserName: true,
      userNameError: null
    };
  case CHANGE_USERNAME_SUCC:
    return {
      ...state,
      requestingUserName: false,
      changingUserName: false,
      userNameError: null,
      userName: action.result.userName
    };
  case CHANGE_USERNAME_FAIL:
    return {
      ...state,
      requestingUserName: false,
      changingUserName: true,
      userNameError: getErrorMsg(action.error.code)
    };
  case CHANGE_REALNAME:
    return {
      ...state,
      requestingRealName: true,
      realNameError: null,
      changingRealName: true
    };
  case CHANGE_REALNAME_SUCC:
    return {
      ...state,
      requestingRealName: false,
      changingRealName: false,
      realNameError: null,
      realName: action.result.realName
    };
  case CHANGE_REALNAME_FAIL:
    return {
      ...state,
      requestingRealName: false,
      changingRealName: true,
      realNameError: getErrorMsg(action.error.code)
    };
  case CHANGE_ID:
    return {
      ...state,
      requestingId: true,
      changingId: true,
      idError: null
    };
  case CHANGE_ID_SUCC:
    return {
      ...state,
      requestingId: false,
      changingId: false,
      idError: null,
      idNumber: action.result.idNumber
    };
  case CHANGE_ID_FAIL:
    return {
      ...state,
      requestingId: false,
      changingId: true,
      idError: null
    };
  case CHANGE_EMAIL:
    return {
      ...state,
      requestingEmail: true,
      changingEmail: true,
      emailError: null
    };
  case CHANGE_EMAIL_SUCC:
    return {
      ...state,
      requestingEmail: false,
      changingEmail: false,
      emailError: null,
      email: action.result.email
    };
  case CHANGE_EMAIL_FAIL:
    return {
      ...state,
      requestingEmail: false,
      changingEmail: true,
      emailError: getErrorMsg(action.error.code)
    };
  case CHANGE_PHONE:
    return {
      ...state,
      requestingPhone: true,
      changingPhone: true,
      phoneError: null
    };
  case CHANGE_PHONE_SUCC:
    return {
      ...state,
      requestingPhone: false,
      changingPhone: false,
      phoneError: null,
      phone: action.result.phone
    };
  case CHANGE_PHONE_FAIL:
    return {
      ...state,
      requestingPhone: false,
      changingPhone: true,
      phoneError: getErrorMsg(action.error.code)
    };
  case UPDATE_BALANCE:
    return {
      ...state,
      balance: action.balance
    };
  case UPDATE_USERNAME:
    return {
      ...state,
      userName: action.userName
    };
  case UPDATE_REALNAME:
    return {
      ...state,
      realName: action.realName
    };
  case UPDATE_PHONE:
    return {
      ...state,
      phone: action.phone
    };
  case UPDATE_EMAIL:
    return {
      ...state,
      email: action.email
    };
  case UPDATE_IDNUMBER:
    return {
      ...state,
      idNumber: action.idNumber
    };
  case UPDATE_LASTLOGIN:
    return {
      ...state,
      lastLogin: action.date
    };
  case RESET_INFO:
    return {
      ...state,
      userName: null,
      realName: null,
      idNumber: null,
      email: null,
      phone: null,
      lastLogin: null
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

export const updateBalance = (amount) => {
  return {
    type: UPDATE_BALANCE,
    balance: amount
  };
};

export const updateUserName = (userName) => {
  return {
    type: UPDATE_USERNAME,
    userName: userName
  };
};

export const updateRealName = (realName) => {
  return {
    type: UPDATE_REALNAME,
    realName
  };
};

export const updatePhone = (phone) => {
  return {
    type: UPDATE_PHONE,
    phone
  };
};

export const updateEmail = (email) => {
  return {
    type: UPDATE_EMAIL,
    email
  };
};

export const updateIdNumber = (idNumber) => {
  return {
    type: UPDATE_IDNUMBER,
    idNumber
  };
};

export const updateLastLogin = (date) => {
  return {
    type: UPDATE_LASTLOGIN,
    date
  };
};

export const resetInfo = () => {
  return {
    type: RESET_INFO
  };
};

export const getBalance = (globalState) => {
  if (globalState.account.info.balance) {
    return globalState.account.info.balance;
  }
};
