const QUERY = 'Blipay/account/QUERY';
const QUERY_SUCC = 'Blipay/account/QUERY_SUCC';
const QUERY_FAIL = 'Blipay/account/QUERY_FAIL';

const initialState = {
  queryResult: null,
  errorMsg: null
};

const fakeData = Array(50).fill({
  date: '2015.01.01 19:08:32',
  description: '账户充值',
  amount: 100.00,
  status: '交易成功'
});

const descriptionType = ['账户充值', '账户提现'];
const statusType = ['交易成功'];

export default (state = initialState, action) => {
  let msg;
  let tran;
  let queryData;
  switch(action.type) {
  case QUERY:
    return state;
  case QUERY_SUCC:
    tran = action.result.transaction;
    queryData = Array(tran.length);
    for (let i = 0; i < tran.length; i++) {
      queryData[i] = {
        date: tran[i].createdAt.substring(0,10)+" "+tran[i].createdAt.substring(11,19),
        description: descriptionType[tran[i].type-1],
        amount: tran[i].amount,
        status: statusType[tran[i].status-1]
      };
    }
    return {
      queryResult: queryData
    };
  case QUERY_FAIL:
    switch(action.error.code) {
    case -1:
      msg = '用户不存在';
      break;
    case -2:
      msg = '服务器内部错误';
      break;
    default:
      msg = '出现未知错误';
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

export const query = (userId, startDate, endDate) => {
  let queryStartDate = startDate ? startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate() : null;
  let queryEndDate = endDate ? endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate() : null;
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