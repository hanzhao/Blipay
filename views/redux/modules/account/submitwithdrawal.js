import { updateBalance } from '../../../components/AccountWelcomePage/index';

const SUBMITWITHDRAWAL = 'Blipay/account/SUBMITWITHDRAWAL';
const SUBMITWITHDRAWAL_SUCC = 'Blipay/account/SUBMITWITHDRAWAL_SUCC';
const SUBMITWITHDRAWAL_FAIL = 'Blipay/account/SUBMITWITHDRAWAL_FAIL';
const TOGGLEWITHDRAWAL = 'Blipay/account/TOGGLEWITHDRAWAL';

const initialState = {
  submittingWithdrawal: false,
  showWithdrawal: false,
  errorMsb: null
};

export default (state = initialState, action) => {
  let msg;
  switch(action.type) {
  case TOGGLEWITHDRAWAL:
    return {
      submitWithdrawal: !state.submitWithdrawal
    };
  case SUBMITWITHDRAWAL:
    return {
      submittingWithdrawal: true
    };
  case SUBMITWITHDRAWAL_SUCC:
    updateBalance(action.result.balance);
    return {
      showWithdrawal: false, // 提现成功后自动关闭弹窗
      submittingWithdrawal: false
    };
  case SUBMITWITHDRAWAL_FAIL:
    switch(action.error.code) {
    case -1:
      msg = '用户名不存在。';
      break;
    case -2:
      msg = '服务器内部错误。';
      break;
    case -3:
      msg = '用户余额不足。';
      break;
    default:
      msg = '出现未知错误。';
      break;
    }
    return {
      submittingWithdrawal: false,
      errorMsg: msg
    };
  }
};

export const submitwithdrawal = (userId, amount) => {
  return {
    types: [
      SUBMITWITHDRAWAL,
      SUBMITWITHDRAWAL_SUCC,
      SUBMITWITHDRAWAL_FAIL
    ],
    promise: (client) => {
      console.log('in submitwithdrawal promise');
      return client.post('/account/withdraw', {
        userId,
        amount
      });
    }
  };
};

export const toggleWithdrawal = () => {
  return {
    types: TOGGLEWITHDRAWAL
  };
};
