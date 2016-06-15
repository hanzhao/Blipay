import store from '../store';
import { push } from 'react-router-redux';

// Action 表
// 注册相关动作
const LOGIN = 'Blipay/auditor/LOGIN';
const LOGIN_SUCCESS = 'Blipay/auditor/LOGIN_SUCCESS';
const LOGIN_FAIL = 'Blipay/auditor/LOGIN_FAIL';
const LOGOUT = 'Blipay/auditor/LOGOUT';
const LOGOUT_SUCCESS = 'Blipay/auditor/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'Blipay/auditor/LOGOUT_FAIL';
// 获得个人信息
const LOAD_ACCOUNT_INFO = 'Blipay/auditor/LOAD_ACCOUNT_INFO';
const LOAD_ACCOUNT_INFO_SUCCESS = 'Blipay/auditor/LOAD_ACCOUNT_INFO_SUCCESS';
const LOAD_ACCOUNT_INFO_FAIL = 'Blipay/auditor/LOAD_ACCOUNT_INFO_FAIL';
// 获得交易记录
const LOAD_TRANSACTIONS = 'Blipay/auditor/LOAD_TRANSACTIONS';
const LOAD_TRANSACTIONS_SUCCESS = 'Blipay/auditor/LOAD_TRANSACTIONS_SUCCESS';
const LOAD_TRANSACTIONS_FAIL = 'Blipay/auditor/LOAD_TRANSACTIONS_FAIL';

const LOAD_LOG = 'Blipay/auditor/LOAD_LOG';
const LOAD_LOG_SUCCESS = 'Blipay/auditor/LOAD_LOG_SUCCESS';
const LOAD_LOG_FAIL = 'Blipay/auditor/LOAD_LOG_FAIL';

const LOAD_USER = 'Blipay/auditor/LOAD_USER';
const LOAD_USER_SUCCESS = 'Blipay/auditor/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'Blipay/auditor/LOAD_USER_FAIL';

const INSERT_DATA = 'Blipay/auditor/INSERT_DATA';
const INSERT_DATA_SUCCESS = 'Blipay/auditor/INSERT_DATA_SUCCESS';
const INSERT_DATA_FAIL = 'Blipay/auditor/INSERT_DATA_FAIL';

const ADDINFO = 'Blipay/auditor/ADDINFO';
const ADDINFO_SUCCESS = 'Blipay/auditor/ADDINFO_SUCCESS';
const ADDINFO_FAIL = 'Blipay/auditor/ADDINFO_FAIL';
const TOGGLE_ADDINFO = 'Blipay/auditor/TOGGLE_ADDINFO';

const SEARCH_ORDER = 'Blipay/auditor/SEARCH_ORDER';
const SEARCH_ORDER_SUCCESS = 'Blipay/auditor/SEARCH_ORDER_SUCCESS';
const SEARCH_ORDER_FAIL = 'Blipay/auditor/SEARCH_ORDER_FAIL';
const SEARCH_BUYER = 'Blipay/auditor/SEARCH_BUYER';
const SEARCH_BUYER_SUCCESS = 'Blipay/auditor/SEARCH_BUYER_SUCCESS';
const SEARCH_BUYER_FAIL = 'Blipay/auditor/SEARCH_BUYER_FAIL';
const SEARCH_SELLER = 'Blipay/auditor/SEARCH_SELLER';
const SEARCH_SELLER_SUCCESS = 'Blipay/auditor/SEARCH_SELLER_SUCCESS';
const SEARCH_SELLER_FAIL = 'Blipay/auditor/SEARCH_SELLER_FAIL';
const TOGGLE_SEARCH = 'Blipay/auditor/TOGGLE_SEARCH';
const TOGGLE_SEARCH_BUYER = 'Blipay/auditor/TOGGLE_SEARCH_BUYER';
const TOGGLE_SEARCH_SELLER = 'Blipay/auditor/TOGGLE_SEARCH_SELLER';

const messages = {
  USER_NOT_EXIST: '审计员账号错误或不存在。',
  INVALID_USERNAME_OR_PASSWORD: '账号或密码错误。'
};

// 用户管理模块初始状态
const initialState = {
  user: null,
  message: null,
  showAddinfoModal: false,
  showSearchModal: false,
  showBuyerModal: false,
  showSellerModal: false
};

// Action Creators
export const login = (data) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: (client) => client.post('/api/auditor/login', data)
});

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: (client) => client.get('/api/auditor/logout')
});

export const loadAccountInfo = () => ({
  types: [LOAD_ACCOUNT_INFO, LOAD_ACCOUNT_INFO_SUCCESS, LOAD_ACCOUNT_INFO_FAIL],
  promise: (client) => client.get('/api/auditor/info')
});

export const loadTransactions = () => ({
  types: [LOAD_TRANSACTIONS, LOAD_TRANSACTIONS_SUCCESS, LOAD_TRANSACTIONS_FAIL],
  promise: (client) => client.get('/api/auditor/transactions')
});

export const loadLog = () => ({
  types: [LOAD_LOG, LOAD_LOG_SUCCESS, LOAD_LOG_FAIL],
  promise: (client) => client.get('/api/auditor/log')
});

export const loadUser = () => ({
  types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
  promise: (client) => client.get('/api/auditor/user')
});

export const insertData = () => ({
  types: [INSERT_DATA, INSERT_DATA_SUCCESS, INSERT_DATA_FAIL],
  promise: (client) => client.get('/api/auditor/insert')
});

export const toggleAddinfo = () => ({
  type: TOGGLE_ADDINFO
});

export const addinfo = (data) => ({
  types: [ADDINFO, ADDINFO_SUCCESS, ADDINFO_FAIL],
  promise: (client) => client.post('/api/auditor/addinfo', data)
});

export const toggleSearch = () => ({
  type: TOGGLE_SEARCH
});

export const toggleSearchBuyer = () => ({
  type: TOGGLE_SEARCH_BUYER
});

export const toggleSearchSeller = () => ({
  type: TOGGLE_SEARCH_SELLER
});

export const searchOrder = (data) => ({
  types: [SEARCH_ORDER, SEARCH_ORDER_SUCCESS, SEARCH_ORDER_FAIL],
  promise: (client) => client.post('/api/auditor/searchorder', data)
});

export const searchBuyer = (data) => ({
  types: [SEARCH_BUYER, SEARCH_BUYER_SUCCESS, SEARCH_BUYER_FAIL],
  promise: (client) => client.post('/api/auditor/searchbuyer', data)
});

export const searchSeller = (data) => ({
  types: [SEARCH_SELLER, SEARCH_SELLER_SUCCESS, SEARCH_SELLER_FAIL],
  promise: (client) => client.post('/api/auditor/searchseller', data)
});

// Helper
const wrapTransaction = (e) => ({
  ...e,
  createdAt: new Date(e.createdAt),
  updatedAt: new Date(e.updatedAt)
});

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
  case LOGIN_SUCCESS:
    setTimeout(() => {
      store.dispatch(push('/audit'));
    }, 0);
    return {
      ...state,
      message: null
    };
  case INSERT_DATA_SUCCESS:
    return {
      ...state,
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
      transactions: action.result.transaction.map(e => wrapTransaction(e)),
      message: null
    };
  case TOGGLE_ADDINFO:
    return {
      ...state,
      showAddinfoModal: !state.showAddinfoModal
    };
  case TOGGLE_SEARCH:
    return {
      ...state,
      showSearchModal: !state.showSearchModal
    };
  case TOGGLE_SEARCH_SELLER:
    return {
      ...state,
      showSellerModal: !state.showSellerModal
    };
  case TOGGLE_SEARCH_BUYER:
    return {
      ...state,
      showBuyerModal: !state.showBuyerModal
    };
  case ADDINFO_SUCCESS:
    return {
      ...state,
      transactions: action.result.transaction.map(e => wrapTransaction(e)),                
      showAddinfoModal: false,
      message: null
    };
  case SEARCH_ORDER_SUCCESS:
  case SEARCH_BUYER_SUCCESS:
  case SEARCH_SELLER_SUCCESS:
    return {
      ...state,
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
      transactions: action.result.transaction.map(e => wrapTransaction(e)),
      message: null,
      showSearchModal: false,
      showBuyerModal: false,
      showSellerModal: false
    };
  case LOGOUT_SUCCESS:
    setTimeout(() => {
      store.dispatch(push('/auditor'));
    }, 0);
    return {
      ...state,
      user: null,
      message: null
    };
  case LOAD_ACCOUNT_INFO_SUCCESS:
    return {
      ...state,
      user: action.result.user,
      message: null
    };
  case LOAD_TRANSACTIONS_SUCCESS:
    return {
      ...state,
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
      transactions: action.result.transactions.map(e => wrapTransaction(e)),
      message: null
    };
  case LOAD_LOG_SUCCESS:
    return {
      ...state,
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
      logtable: action.result.logtable.map(e => wrapTransaction(e)),
      message: null
    };
  case LOAD_USER_SUCCESS:
    return {
      ...state,
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
      loguser: action.result.loguser.map(e => wrapTransaction(e)),
      message: null
    };
    // Errors
  case LOGIN_FAIL:
  case LOGOUT_FAIL:
    return {
      ...state,
      message: (action.error.type && messages[action.error.type]) || '未知错误'
    };
  default:
    return state;
  }
}
