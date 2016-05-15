const QUERY = 'Blipay/account/QUERY';
const QUERY_SUCC = 'Blipay/account/QUERY_SUCC';
const QUERY_FAIL = 'Blipay/account/QUERY_FAIL';

const initialState = {
  queryResult: null,
  errorMsg: null
};

const fakeData = Array(50).fill({
  date: '2015.01.01 19:08:32',
  description: '�˻���ֵ',
  amount: 100.00,
  status: '���׳ɹ�'
});

export default (state = initialState, action) => {
  let msg;
  let tran;
  switch(action.type) {
  case QUERY:
    return state;
  case QUERY_SUCC:
    //tran = res.data.transaction;
    return {
      queryResult: fakeData
    };
  case QUERY_FAIL:
    switch(action.error.code) {
    case -1:
      msg = '�û������ڡ�';
      break;
    case -2:
      msg = '�������ڲ�����';
      break;
    case -3:
      msg = 'δѡ��ʱ�����䡣';
      break;
    default:
      msg = '����δ֪����';
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
      return client.post('/account/get_transaction', {
        userId,
        queryStartDate,
        queryEndDate
      });
    }
  };
};