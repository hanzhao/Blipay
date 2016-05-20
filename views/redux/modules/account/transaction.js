const QUERY = 'Blipay/account/QUERY';
const QUERY_SUCC = 'Blipay/account/QUERY_SUCC';
const QUERY_FAIL = 'Blipay/account/QUERY_FAIL';
const UPDATE_TRANSACTION = 'Blipay/account/UPDATE_TRANSACTION';
const UPDATE_TRANSACTION_SUCC = 'Blipay/account/UPDATE_TRANSACTION_SUCC';
const UPDATE_TRANSACTION_FAIL = 'Blipay/account/UPDATE_TRANSACTION_FAIL';
const RESET_TRANSACTION = 'Blipay/account/RESET_TRANSACTION';

const initialState = {
  queryResult: null,
  errorMsg: null,
  querying: false,
  updatingTransaction: false,
  transactions: []
};

const getStatus = (code) => {
  switch (code) {
  case 0:
    return '交易失败';
  case 1:
    return '交易成功';
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

export default (state = initialState, action) => {
  let msg;
  switch(action.type) {
  case QUERY:
    return {
      ...state,
      querying: true
    };
  case QUERY_SUCC:
    return {
      ...state,
      querying: false,
      queryResult: action.result.transaction.map(
        (e) => {
          return {
            date: getDate(e.createdAt),
            status: getStatus(e.status),
            description: getDescription(e.type),
            amount: e.amount
          };
        }
      ).reverse()
    };
  case QUERY_FAIL:
    switch(action.error.code) {
    case -1:
      msg = '用户不存在。';
      break;
    case -2:
      msg = '服务器内部错误。';
      break;
    case -3:
      msg = '未选择时间区间。';
      break;
    default:
      msg = '出现未知错误。';
      break;
    }
    return {
      ...state,
      queryResult: null,
      errorMsg: msg,
      querying: false
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
        (e) => {
          return {
            date: getDate(e.createdAt),
            status: getStatus(e.status),
            description: getDescription(e.type),
            amount: e.amount
          };
        }
      )
    };
  case UPDATE_TRANSACTION_FAIL:
    return {
      ...state,
      updatingTransaction: false
    };
  case RESET_TRANSACTION:
    return {
      ...state,
      queryResult: null,
      transactions: []
    };
  default:
    return state;
  }
};

export const query = (userId, queryStartDate, queryEndDate) => {
  return {
    types: [
      QUERY,
      QUERY_SUCC,
      QUERY_FAIL
    ],
    promise: (client) => {
      return client.get('/account/get_transaction', {
        userId,
        queryStartDate,
        queryEndDate
      });
    }
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

export const resetTransaction = () => {
  return {
    type: RESET_TRANSACTION
  };
};
