const LOGIN = 'Blipay/account/LOGIN';
const LOGIN_SUCC = 'Blipay/account/LOGIN_SUCC';
const LOGIN_FAIL = 'Blipay/account/LOGIN_FAIL';
const LOGOUT = 'Blipay/account/LOGOUT';
const LOGOUT_SUCC = 'Blipay/account/LOGOUT_SUCC';
const LOGOUT_FAIL = 'Blipay/account/LOGOUT_FAIL';
const UPDATE_USERID = 'Blipay/account/UPDATE_USERID';
const UPDATE_BALANCE = 'Blipay/account/UPDATE_BALANCE';
const UPDATE_USERNAME = 'Blipay/account/UPDATE_USERNAME';
const UPDATE_EMAIL = 'Blipay/account/UPDATE_EMAIL';
const UPDATE_IDNUMBER = 'Blipay/account/UPDATE_IDNUMBER';
const UPDATE_PHONE = 'Blipay/account/UPDATE_PHONE';
const UPDATE_REALNAME = 'Blipay/account/UPDATE_REALNAME';
const UPDATE_LASTLOGIN = 'Blipay/account/UPDATE_LASTLOGIN';
const UPDATE_TRANSACTION = 'Blipay/account/UPDATE_TRANSACTION';
const UPDATE_TRANSACTION_SUCC = 'Blipay/account/UPDATE_TRANSACTION_SUCC';
const UPDATE_TRANSACTION_FAIL = 'Blipay/account/UPDATE_TRANSACTION_FAIL';

const initialState = {
  loggingIn: false,
  errorMsg: null,
  transactions: []
};

const getStatus = (code) => {
  switch (code) {
  case 0:
    return '交易失败';
  case 1:
    return '交易234成功';
  default:
    return '未知';
  }
};

const getDescription = (code) => {
  switch (code) {
  case 1:
    return '账户充值';
  case 2:
    return '余额提现';
  default:
    return '未知';
  }
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
      userName: action.result.userName,
      balance: action.result.balance,
      lastLogin: action.result.lastLogin.replace(',', ' '),
      idNumber: action.result.idNumber,
      realName: action.result.realName,
      email: action.result.email,
      phone: action.result.phone,
      transactions: action.result.transactions.map(
        (e, i) => {
          return {
            date: getDate(e.createdAt),
            status: getStatus(e.status),
            description: getDescription(e.type),
            amount: e.amount
          };
        }
      ).reverse(),
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
  case UPDATE_BALANCE:
    return {
      ...state,
      balance: Number(action.amount)
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
  case UPDATE_PHONE:
    return {
      ...state,
      phone: action.phone
    };
  case UPDATE_TRANSACTION:
    return {
      ...state,
      updatingTransaction: true
    };
  case UPDATE_TRANSACTION_SUCC:
    return {
      ...state,
      updatingTransaction: false,
      transactions: action.result.transactions.map(
        (e, i) => {
          return {
            date: getDate(e.createdAt),
            status: getStatus(e.status),
            description: getDescription(e.type),
            amount: e.amount
          };
        }
      ).reverse()
    };
  case UPDATE_TRANSACTION_FAIL:
    return {
      ...state,
      updatingTransaction: false
    };
  case UPDATE_USERID:
    return {
      ...state,
      userId: action.userId
    };
  case UPDATE_LASTLOGIN:
    return {
      ...state,
      lastLogin: action.date
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
  }
};

export const logout = () => {
  return {
    types: [LOGOUT, LOGOUT_SUCC, LOGOUT_FAIL],
    promise: (client) => {
      return clent.post('/account/logout');
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

export const updateBalance = (amount) => {
  return {
    type: UPDATE_BALANCE,
    amount: amount
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

export const updateTransaction = (userId) => {
  return {
    types: [
      UPDATE_TRANSACTION,
      UPDATE_TRANSACTION_SUCC,
      UPDATE_TRANSACTION_FAIL
    ],
    promise: (client) => {
      return client.get('/account/get_recent_transaction', {
        userId
      });
    }
  };
};

export const updateUserId = (userId) => {
  return {
    type: UPDATE_USERID,
    userId
  };
};

export const updateLastLogin = (date) => {
  return {
    type: UPDATE_LASTLOGIN,
    date
  };
};
