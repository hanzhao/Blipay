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
const TOGGLE_VERIFY_EMAIL = 'Blipay/account/TOGGLE_VERIFY_EMAIL';
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

// 用户管理模块初始状态
const initialState = {
  user: null,
  message: null,
  showTopupModal: false,
  showWithdrawModal: false
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

export const toggleVerifyEmail = () => ({
  type: TOGGLE_VERIFY_EMAIL
})

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
      return state
    case LOGOUT_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/'))
      }, 0)
      return {
        ...state,
        user: null
      }
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
    case TOGGLE_VERIFY_EMAIL:
      return {
        ...state,
        showVerifyEmailModal: !state.showVerifyEmailModal
      }
    case LOAD_ACCOUNT_INFO_SUCCESS:
      return {
        ...state,
        user: action.result.user
      }
    case LOAD_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
        transactions: action.result.transactions.map(e => wrapTransaction(e))
      }
    case TOPUP_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user },
        transactions: [ ...state.transactions,
                        wrapTransaction(action.result.transaction) ],
        showTopupModal: false
      }
    case WITHDRAW_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user },
        transactions: [ ...state.transactions,
                        wrapTransaction(action.result.transaction) ],
        showWithdrawModal: false
      }
    case UPDATE_INFO_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.result.user }
      }
    // Errors
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return {
        ...state,
        message: action.error.type || action.error
      }
    default:
      return state
  }
}
