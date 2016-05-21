import { updateBalance } from './info';
import { updateTransaction } from './transaction';
import { getUserId } from './auth';
import store from '../../store';

const ENTER_WITHDRAW = 'Blipay/account/ENTER_WITHDRAW';
const EXIT_WITHDRAW = 'Blipay/account/EXIT_WITHDRAW';
const WITHDRAW = 'Blipay/account/WITHDRAW';
const WITHDRAW_SUCC = 'Blipay/account/WITHDRAW_SUCC';
const WITHDRAW_FAIL = 'Blipay/account/WITHDRAW_FAIL';

const initialState = {
  withdrawing: false,
  requesting: false,
  errorMsg: null
};

export default (state = initialState, action) => {
  let msg;
  switch (action.type) {
  case ENTER_WITHDRAW:
    return {
      withdrawing: true
    };
  case EXIT_WITHDRAW:
    return {
      withdrawing: false
    };
  case WITHDRAW:
    return {
      withdrawing: true,
      requesting: true
    };
  case WITHDRAW_SUCC:
    setTimeout(() => {
      store.dispatch(updateTransaction(getUserId(store.getState())));
      store.dispatch(updateBalance(action.result.balance));
    }, 10);
    return {
      withdrawing: false,
      requesting: false
    };
  case WITHDRAW_FAIL:
    switch (action.error.code) {
    case -1:
      msg = '用户ID不存在。';
      break;
    case -2:
      msg = '服务器内部错误。';
      break;
    case -3:
      msg = '余额不足，无法提现。';
      break;
    default:
      msg = '出现未知错误。';
      break;
    }
    return {
      withdrawing: true,
      requesting: false,
      errorMsg: msg
    };
  default:
    return state;
  }
};

export const enterWithdraw = () => {
  return {
    type: ENTER_WITHDRAW
  };
};

export const exitWithdraw = () => {
  return {
    type: EXIT_WITHDRAW
  };
};

export const withdraw = (userId, amount) => {
  return {
    types: [
      WITHDRAW,
      WITHDRAW_SUCC,
      WITHDRAW_FAIL
    ],
    promise: (client) => {
      return client.post('/account/withdraw', {
        userId,
        amount
      });
    }
  };
};
