import store from '../store'
import { push } from 'react-router-redux'

// Action 表
// 注册相关动作
const REGISTER = 'Blipay/account/REGISTER';
const REGISTER_SUCCESS = 'Blipay/account/REGISTER_SUCCESS';
const REGISTER_FAIL = 'Blipay/account/REGISTER_FAIL';
const LOGIN = 'Blipay/account/LOGIN';
const LOGIN_SUCCESS = 'Blipay/account/LOGIN_SUCCESS';
const LOGIN_FAIL = 'Blipay/account/LOGIN_FAIL';
const LOGOUT = 'Blipay/account/LOGOUT';
const LOGOUT_SUCCESS = 'Blipay/account/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'Blipay/account/LOGOUT_FAIL';
// 充值/提现 Modal
const TOGGLE_TOPUP = 'Blipay/account/TOGGLE_TOPUP';
const TOGGLE_WITHDRAW = 'Blipay/account/TOGGLE_WITHDRAW';
// 账户密码/支付密码/实名验证
const TOGGLE_MODIFY_LOGINPASS = 'Blipay/account/TOGGLE_MODIFY_LOGINPASS';
const TOGGLE_MODIFY_PAYPASS = 'Blipay/account/TOGGLE_MODIFY_PAYPASS';
const TOGGLE_VERIFICATION = 'Blipay/account/TOGGLE_VERIFICATION';
// 获得个人信息
const LOAD_ACCOUNT_INFO = 'Blipay/account/LOAD_ACCOUNT_INFO';
const LOAD_ACCOUNT_INFO_SUCCESS = 'Blipay/account/LOAD_ACCOUNT_INFO_SUCCESS';
const LOAD_ACCOUNT_INFO_FAIL = 'Blipay/account/LOAD_ACCOUNT_INFO_FAIL';
// 获得交易记录
const LOAD_TRANSACTIONS = 'Blipay/account/LOAD_TRANSACTIONS';
const LOAD_TRANSACTIONS_SUCCESS = 'Blipay/account/LOAD_TRANSACTIONS_SUCCESS';
const LOAD_TRANSACTIONS_FAIL = 'Blipay/account/LOAD_TRANSACTIONS_FAIL';
// 充值/提现
const TOPUP = 'Blipay/account/TOPUP';
const TOPUP_SUCCESS = 'Blipay/account/TOPUP_SUCCESS';
const TOPUP_FAIL = 'Blipay/account/TOPUP_FAIL';
const WITHDRAW = 'Blipay/account/WITHDRAW';
const WITHDRAW_SUCCESS = 'Blipay/account/WITHDRAW_SUCCESS';
const WITHDRAW_FAIL = 'Blipay/account/WITHDRAW_FAIL';
// 修改个人信息
const UPDATE_INFO = 'Blipay/account/UPDATE_INFO';
const UPDATE_INFO_SUCCESS = 'Blipay/account/UPDATE_INFO_SUCCESS';
const UPDATE_INFO_FAIL = 'Blipay/account/UPDATE_INFO_FAIL';
// 申请实名认证
const APPLY_VERIFICATION = 'Blipay/account/APPLY_VERIFICATION';
const APPLY_VERIFICATION_SUCCESS = 'Blipay/account/APPLY_VERIFICATION_SUCCESS';
const APPLY_VERIFICATION_FAIL = 'Blipay/account/APPLY_VERIFICATION_FAIL';
// 修改登录密码
const CHANGE_LOGINPASS = 'Blipay/account/CHANGE_LOGINPASS';
const CHANGE_LOGINPASS_SUCCESS = 'Blipay/account/CHANGE_LOGINPASS_SUCCESS';
const CHANGE_LOGINPASS_FAIL = 'Blipay/account/CHANGE_LOGINPASS_FAIL';
// 修改支付密码
const CHANGE_PAYPASS = 'Blipay/account/CHANGE_PAYPASS';
const CHANGE_PAYPASS_SUCCESS = 'Blipay/account/CHANGE_PAYPASS_SUCCESS';
const CHANGE_PAYPASS_FAIL = 'Blipay/account/CHANGE_PAYPASS_FAIL';
// 找回密码
const FIND_PASSWORD = 'Blipay/account/FIND_PASSWORD';
const FIND_PASSWORD_SUCCESS = 'Blipay/account/FIND_PASSWORD_SUCCESS';
const FIND_PASSWORD_FAIL = 'Blipay/account/FIND_PASSWORD_FAIL';

const messages = {
  USER_NOT_EXIST: '当前用户名未注册。',
  INVALID_USERNAME_OR_PASSWORD: '用户名或密码错误。'
}

// 用户管理模块初始状态
const initialState = {
  user: null,
  message: null,
  showTopupModal: false,
  showWithdrawModal: false,
  showVerification: false
}

// Action Creators
export const register = (data) => ({
  types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
  promise: (client) => client.post('/api/account/register', data)
})

export const login = (data) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: (client) => client.post('/api/account/login', data)
})

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: (client) => client.get('/api/account/logout')
})

export const toggleTopup = () => ({
  type: TOGGLE_TOPUP
})

export const toggleWithdraw = () => ({
  type: TOGGLE_WITHDRAW
})

export const toggleModifyLoginpass = () => ({
  type: TOGGLE_MODIFY_LOGINPASS
})

export const toggleModifyPaypass = () => ({
  type: TOGGLE_MODIFY_PAYPASS
})

export const toggleVerification = () => ({
  type: TOGGLE_VERIFICATION
});

export const loadAccountInfo = () => ({
  types: [LOAD_ACCOUNT_INFO, LOAD_ACCOUNT_INFO_SUCCESS, LOAD_ACCOUNT_INFO_FAIL],
  promise: (client) => client.get('/api/account/info')
})

export const loadTransactions = () => ({
  types: [LOAD_TRANSACTIONS, LOAD_TRANSACTIONS_SUCCESS, LOAD_TRANSACTIONS_FAIL],
  promise: (client) => client.get('/api/account/transactions')
})

export const topup = (data) => ({
  types: [TOPUP, TOPUP_SUCCESS, TOPUP_FAIL],
  promise: (client) => client.post('/api/account/topup', data)
})

export const withdraw = (data) => ({
  types: [WITHDRAW, WITHDRAW_SUCCESS, WITHDRAW_FAIL],
  promise: (client) => client.post('/api/account/withdraw', data)
})

export const updateInfo = (data) => ({
  types: [UPDATE_INFO, UPDATE_INFO_SUCCESS, UPDATE_INFO_FAIL],
  promise: (client) => client.post('/api/account/update_info', data)
})

export const applyVerification = () => ({
  types: [APPLY_VERIFICATION, APPLY_VERIFICATION_SUCCESS, APPLY_VERIFICATION_FAIL],
  promise: (client) => client.post('/api/account/apply_verification')
});

export const changeLoginpass = (data) => ({
  types: [CHANGE_LOGINPASS, CHANGE_LOGINPASS_SUCCESS, CHANGE_LOGINPASS_FAIL],
  promise: (client) => client.post('/api/account/change_loginpass', data)
});

export const changePaypass = (data) => ({
  types: [CHANGE_PAYPASS, CHANGE_PAYPASS_SUCCESS, CHANGE_PAYPASS_FAIL],
  promise: (client) => client.post('/api/account/change_paypass', data)
});

export const findPassword = (data) => ({
  types: [FIND_PASSWORD, FIND_PASSWORD_SUCCESS, FIND_PASSWORD_FAIL],
  promise: (client) => client.post('/api/account/find_password', data)
});

// Helper
const wrapTransaction = (e) => ({
  ...e,
  createdAt: new Date(e.createdAt),
  updatedAt: new Date(e.updatedAt)
})

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/account'))
      }, 0)
      return {
        ...state,
        message: null
      }
    case LOGOUT_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/'))
      }, 0)
      return {
        ...state,
        user: null,
        message: null
      };
    case TOGGLE_TOPUP:
      return {
        ...state,
        showTopupModal: !state.showTopupModal
      }
    case TOGGLE_WITHDRAW:
      return {
        ...state,
        showWithdrawModal: !state.showWithdrawModal
      }
    case TOGGLE_MODIFY_LOGINPASS:
      return {
        ...state,
        showModifyLoginpassModal: !state.showModifyLoginpassModal
      }
    case TOGGLE_MODIFY_PAYPASS:
      return {
        ...state,
        showModifyPaypassModal: !state.showModifyPaypassModal
      }
    case TOGGLE_VERIFICATION:
      return {
        ...state,
        showVerification: !state.showVerification
      };
    case LOAD_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        user: action.result.user,
        message: null
      }
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
        transactions: action.result.transactions.map(e => wrapTransaction(e)),
        message: null
      }
    case TOPUP_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user },
        transactions: [ ...state.transactions,
                        wrapTransaction(action.result.transaction) ],
        showTopupModal: false,
        message: null
      }
    case WITHDRAW_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user },
        transactions: [ ...state.transactions,
                        wrapTransaction(action.result.transaction) ],
        showWithdrawModal: false,
        message: null
      }
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user },
        message: null
      }
    case APPLY_VERIFICATION_SUCCESS:
      return {
        ...state,
        showVerification: false,
        user: { ...state.user, status: 1 },
        message: null
      };
    case CHANGE_LOGINPASS_SUCCESS:
      return {
        ...state,
        showModifyLoginpassModal: false,
        message: null
      };
    case CHANGE_PAYPASS_SUCCESS:
      return {
        ...state,
        showModifyPaypassModal: false,
        message: null
      };
    case FIND_PASSWORD:
      return state;
    case FIND_PASSWORD_SUCCESS:
      return {
        ...state,
        findRes: '已将新密码发送至您的邮箱。'
      };
    case FIND_PASSWORD_FAIL:
      return {
        ...state,
        findRes: '用户名或邮箱输入有误。'
      }
    // Errors
    case CHANGE_PAYPASS_FAIL:
    case CHANGE_LOGINPASS_FAIL:
    case APPLY_VERIFICATION_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return {
        ...state,
        message: (action.error.type && messages[action.error.type]) || '未知错误'
      }
    default:
      return state
  }
}
