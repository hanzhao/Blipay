const QUERY = 'Blipay/account/QUERY';
const QUERY_SUCC = 'Blipay/account/QUERY_SUCC';
const QUERY_FAIL = 'Blipay/account/QUERY_FAIL';

const initialState = {
  queryResult: null,
  errorMsg: null
};



const getStatus = (code) => {
  switch (code) {
  case 0:
    return '交易失败';
  case 1:
    return '交易123成功';
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
  let tran;
  switch(action.type) {
  case QUERY:
    return state;
  case QUERY_SUCC:
    return {
      queryResult: action.result.transaction.map(
        (e, i) => {
          return {
            date: getDate(e.createdAt),
            status: getStatus(e.status),
            description: getDescription(e.type),
            amount: e.amount,
            userId:e.userId
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
      queryResult: null,
      errorMsg: msg
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
      console.log('in promise');
      return client.get('/account/get_transaction', {
        userId,
        queryStartDate,
        queryEndDate
      });
    }
  };
};
