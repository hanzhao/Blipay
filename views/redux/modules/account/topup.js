const ENTER_TOPUP = 'Blipay/account/ENTER_TOPUP';
const EXIT_TOPUP = 'Blipay/account/EXIT_TOPUP';
const TOPUP = 'Blipay/account/TOPUP';
const TOPUP_SUCC = 'Blipay/account/TOPUP_SUCC';
const TOPUP_FAIL = 'Blipay/accout/TOPUP_FAIL';

const initialState = {
  toppingUp: false,
  requesting: false,
  errorMsg: null
};

export default (state=initialState, action) => {
  let msg;
  switch (action.type) {
    case ENTER_TOPUP:
      return {
        toppingUp: true
      };
    case EXIT_TOPUP:
      return {
        toppingUp: false
      };
    case TOPUP:
      return {
        toppingUp: true,
        requesting: true
      }
    case TOPUP_SUCC:
      return {
        toppingUp: false,
        requesting: false,
        balance: action.result.balance
      };
    case TOPUP_FAIL:
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
        toppingUp: true,
        requesting: false,
        errorMsg: msg
      };
    default:
      return state;
  }
};

export const enterTopup = () => {
  return {
    type: ENTER_TOPUP
  };
};

export const exitTopup = () => {
  return {
    type: EXIT_TOPUP
  };
};

export const topup = (userId, amount) => {
  return {
    types: [
      TOPUP,
      TOPUP_SUCC,
      TOPUP_FAIL
    ],
    promise: (client) => {
      return client.post('/auditor/getdata', {
        userId,
        amount
      });
    }
  };
};

export const getTopupBalance = (globalState) => {
  if (globalState.account &&
      globalState.account.topup)
    return globalState.account.topup.balance;
  else
    return undefined;
};
