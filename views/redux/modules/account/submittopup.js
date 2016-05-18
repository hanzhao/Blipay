import { updateBalance } from '../../../components/AccountWelcomePage/index';

const SUBMITTOPUP = 'Blipay/account/SUBMITTOPUP';
const SUBMITTOPUP_SUCC = 'Blipay/account/SUBMITTOPUP_SUCC';
const SUBMITTOPUP_FAIL = 'Blipay/account/SUBMITTOPUP_FAIL';
const TOGGLETOPUP = 'Blipay/account/TOGGLETOPUP';

const initialState = {
  submittingTopup: false,
  showTopup: false,
  errorMsg: null
};

export default (state = initialState, action) => {
  let msg;
  switch(action.type) {
  case TOGGLETOPUP:
    return {
      showTopup: !state.showTopup
    };
  case SUBMITTOPUP:
    return {
      submittingTopup: true
    };
  case SUBMITTOPUP_SUCC:
    updateBalance(action.result.balance);
    return {
      showTopup: false, // 充值成功后自动关闭弹窗
      submittingTopup: false
    };
  case SUBMITTOPUP_FAIL:
    switch(action.error.code) {
    case -1:
      msg = '用户名不存在。';
      break;
    case -2:
      msg = '服务器内部错误。';
      break;
    default:
      msg = '出现未知错误。';
      break;
    }
    return {
      submittingTopup: false,
      errorMsg: msg
    };
  }
};

export const submittopup = (userId, amount) => {
  return {
    types: [
      SUBMITTOPUP,
      SUBMITTOPUP_SUCC,
      SUBMITTOPUP_FAIL
    ],
    promise: (client) => {
      console.log('in submittopup promise');
      return client.post('/account/charge', {
        userId,
        amount
      });
    }
  };
};

export const toggleTopup = () => {
  return {
    types: TOGGLETOPUP
  };
};
