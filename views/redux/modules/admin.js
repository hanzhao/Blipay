import store from '../store'
import { push } from 'react-router-redux'

// Action 表
// 登陆/登出
const LOGIN = 'Blipay/admin/LOGIN';
const LOGIN_SUCCESS = 'Blipay/admin/LOGIN_SUCCESS';
const LOGIN_FAIL = 'Blipay/admin/LOGIN_FAIL';
const LOGOUT = 'Blipay/admin/LOGOUT';
const LOGOUT_SUCCESS = 'Blipay/admin/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'Blipay/admin/LOGOUT_FAIL';
// 查看管理员基本信息
const ADMIN_INFO = 'Blipau/admin/ADMIN_INFO';
// 添加/删除/修改管理员
const ADD_ADMIN = 'Blipay/admin/ADD_ADMIN';
const ADD_ADMIN_SUCCESS = 'Blipay/admin/ADD_ADMIN_SUCCESS';
const ADD_ADMIN_FAIL = 'Blipay/admin/ADD_ADMIN_FAIL';
const DELETE_ADMIN = 'Blipay/admin/DELETE_ADMIN';
const DELETE_ADMIN_SUCCESS = 'Blipay/admin/DELETE_ADMIN_SUCCESS';
const DELETE_ADMIN_FAIL = 'Blipay/admin/DELETE_ADMIN_FAIL'
const MODIFY_ADMIN = 'Blipay/admin/MODIFY_ADMIN';
const MODIFY_ADMIN_SUCCESS = 'Blipay/admin/MODIFY_ADMIN_SUCCESS';
const MODIFY_ADMIN_FAIL = 'Blipay/admin/MODIFY_ADMIN_FAIL';
// 修改个人信息
const USER_LIST = 'Blipay/admin/USER_LIST';
const MODIFY_USER = 'Blipay/admin/MODIFY_USER';
const MODIFY_USER_SUCCESS = 'Blipay/admin/MODIFY_USER_SUCCESS';
const MODIFY_USER_FAIL = 'Blipay/admin/MODIFY_USER_FAIL';
// 实名验证
const VERIFICATION_LIST = 'Blipay/admin/VERIFICATION_LIST';
const VERIFICATION = 'Blipay/admin/VERIFICATION';
const VERIFICATION_SUCCESS = 'Blipay/admin/VERIFICATION_SUCCESS';
const VERIFICATION_FAIL = 'Blipay/admin/VERIFICATION_FAIL';
// 仲裁
const ARBITRATION_LIST = 'Blipay/admin/ARBITRATION_LIST';
const ARBITRATION = 'Blipay/admin/ARBITRATION';
const ARBITRATION_SUCCESS = 'Blipay/admin/ARBITRATION_SUCCESS';
const ARBITRATION_FAIL = 'Blipay/admin/ARBITRATION_FAIL';

//register
const ADMIN_REGISTER = 'Blipay/admin/ADMIN_REGISTER';
const ADMIN_REGISTER_SUCCESS = 'Blipay/admin/ADMIN_REGISTER_SUCCESS';
const ADMIN_REGISTER_FAIL = 'Blipay/admin/ADMIN_REGISTER_FAIL';

const messages = {
  USER_NOT_EXIST: '当前用户名未注册。',
  INVALID_USERNAME_OR_PASSWORD: '用户名或密码错误。'
}

// 用户管理模块初始状态
const initialState = {
  user: null,
  message: null,
  adminInfo: false,
  userList: false,
  verificationList: false,
  arbitrationList: false
}

// Action Creators
export const login = (data) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: (client) => client.post('/api/admin/login', data)
})

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: (client) => client.get('/api/admin/logout')
})

export const adminRegister = (data) => ({ //调试用
  types: [ADMIN_REGISTER,ADMIN_REGISTER_SUCCESS,ADMIN_REGISTER_FAIL],
  promise: (client) => client.post('/api/admin/register', data)
})

export const adminInfo = () => ({
  type: ADMIN_INFO
})

export const userList = () => ({
  type: USER_LIST
})

export const verificationList = () => ({
  type: VERIFICATION_LIST
})

export const arbitrationList = () => ({
  type: ARBITRATION_LIST
})

export const addAdmin = (data) => ({
  types: [ADD_ADMIN, ADD_ADMIN_SUCCESS, ADD_ADMIN_FAIL],
  promise: (client) => client.get('/api/admin/create', data)
})

export const deleteAdmin = (data) => ({
  types: [DELETE_ADMIN, DELETE_ADMIN_SUCCESS, DELETE_ADMIN_FAIL],
  promise: (client) => client.get('/api/admin/delete', data)
})

export const modifyAdmin = (data) => ({
  types: [MODIFY_ADMIN, MODIFY_ADMIN_SUCCESS, MODIFY_ADMIN_FAIL],
  promise: (client) => client.get('/api/admin/withdrawal', data)
})

export const modifyUser = (data) => ({
  types: [MODIFY_USER, MODIFY_USER_SUCCESS, MODIFY_USER_FAIL],
  promise: (client) => client.post('/api/admin/modifyuser', data)
})

export const arbitration = (data) => ({
  types: [ARBITRATION_PASS, ARBITRATION_SUCCESS, ARBITRATION_FAIL],
  promise: (client) => client.post('/api/admin/dealarbitration', data)
})

export const verification = (data) => ({
  types: [VERIFICATION, VERIFICATION_SUCCESS, VERIFICATION_FAIL],
  promise: (client) => client.post('/api/admin/updateidbase', data)
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
    case LOGIN_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/admin/account/welcome'))
      }, 0)
      return {
        ...state,
        user: action.result.adminId,
        message: null
      }
    case LOGOUT_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/admin'))
      }, 0)
      return {
        ...state,
        user: null
      }
    case ADMIN_INFO:
      return {
        ...state,
        adminInfo: true,
        userList: false,
        verificationList: false,
        arbitrationList: false
      }
      break;
    case USER_LIST:
      return {
        ...state,
        userList: true,
        adminInfo: false,
        verificationList: false,
        arbitrationList: false
      }
    case VERIFICATION_LIST:
      return {
        ...state,
        verificationList: true,
        adminInfo: false,
        userList: false,
        arbitrationList: false
      }
    case ARBITRATION_LIST:
      return {
        ...state,
        arbitrationList: true,
        adminInfo: false,
        userList: false,
        verificationList: false,
      }
    case ADD_ADMIN:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
        message: null,
        user: { ...state.user, ...action.result.adminId},
        adminInfo: true,
        userList: false,
        verificationList: false,
        arbitrationList: false
      }
    case DELETE_ADMIN:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
        adminInfo: true,
        userList: false,
        verificationList: false,
        arbitrationList: false
      }
    case MODIFY_ADMIN:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
        adminInfo: true,
        userList: false,
        verificationList: false,
        arbitrationList: false
      }
    case MODIFY_USER:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
        adminInfo: false,
        userList: false,
        verificationList: false,
        arbitrationList: false
      }
    case VERIFICATION_LIST:
      return {
        ...state,
        adminInfo: false,
        userList: false,
        verificationList: true,
        arbitrationList: false
      }
    case ARBITRATION_LIST:
      return {
        ...state,
        adminInfo: false,
        userList: false,
        verificationList: false,
        arbitrationList: true
      }
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
        // 映射 transactions 里的 createdAt 和 updatedAt 变成 Date Object
        transactions: action.result.transactions.map(e => wrapTransaction(e))
      }
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
      }
    case MODIFY_ADMIN_SUCCESS:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
      }
    case MODIFY_USER_SUCCESS:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
      }
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
      }
    case ARBITRATION_SUCCESS:
      return {
        ...state,
        adminAction: [ ...state.adminAction,
                       wrapTransaction(state.result.adminAction)],
      }
    // Errors
    case ADD_ADMIN_FAIL:
    case DELETE_ADMIN_FAIL:
    case MODIFY_ADMIN_FAIL:
    case MODIFY_USER_FAIL:
    case VERIFICATION_FAIL:
    case ARBITRATION_FAIL:
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
