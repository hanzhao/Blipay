import store from '../store'
import { push } from 'react-router-redux'
import { message } from 'antd';
import _ from 'lodash';

// Action 表
// 登陆/登出
const LOGIN = 'Blipay/admin/LOGIN';
const LOGIN_SUCCESS = 'Blipay/admin/LOGIN_SUCCESS';
const LOGIN_FAIL = 'Blipay/admin/LOGIN_FAIL';
const LOGOUT = 'Blipay/admin/LOGOUT';
const LOGOUT_SUCCESS = 'Blipay/admin/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'Blipay/admin/LOGOUT_FAIL';
// 查看管理员基本信息
const LOAD_ADMIN_INFO = 'Blipay/admin/LOAD_ADMIN_INFO';
const LOAD_ADMIN_INFO_SUCCESS = 'Blipay/admin/LOAD_ADMIN_INFO_SUCCESS';
const LOAD_ADMIN_INFO_FAIL = 'Blipay/admin/LOAD_ADMIN_INFO_FAIL';
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
const LOAD_VERIFYING_LIST = 'Blipay/admin/LOAD_VERIFYING_LIST';
const LOAD_VERIFYING_LIST_SUCCESS = 'Blipay/admin/LOAD_VERIFYING_LIST_SUCCESS';
const LOAD_VERIFYING_LIST_FAIL = 'Blipay/admin/LOAD_VERIFYING_LIST_FAIL';

const VERIFY = 'Blipay/admin/VERIFY';
const VERIFY_SUCCESS = 'Blipay/admin/VERIFY_SUCCESS';
const VERIFY_FAIL = 'Blipay/admin/VERIFY_FAIL';
// 仲裁
const ARBITRATION_LIST = 'Blipay/admin/ARBITRATION_LIST';
const ARBITRATION_LIST_SUCCESS = 'Blipay/admin/ARBITRATION_LIST_SUCCESS';
const ARBITRATION_LIST_FAIL = 'Blipay/admin/ARBITRATION_LIST_FAIL';
const ARBITRATION = 'Blipay/admin/ARBITRATION';
const ARBITRATION_SUCCESS = 'Blipay/admin/ARBITRATION_SUCCESS';
const ARBITRATION_FAIL = 'Blipay/admin/ARBITRATION_FAIL';

//register
const ADMIN_REGISTER = 'Blipay/admin/ADMIN_REGISTER';
const ADMIN_REGISTER_SUCCESS = 'Blipay/admin/ADMIN_REGISTER_SUCCESS';
const ADMIN_REGISTER_FAIL = 'Blipay/admin/ADMIN_REGISTER_FAIL';
//特殊账户操作
const CREATE_SPEC_ACT='Blipay/admin/CREATE_SPEC_ACT';
const CREATE_SPEC_ACT_SUCCESS='Blipay/admin/CREATE_SPEC_ACT_SUCCESS';
const CREATE_SPEC_ACT_FAIL='Blipay/admin/CREATE_SPEC_ACT_FAIL';
const DELETE_SPEC_ACT='Blipay/admin/DELETE_SPEC_ACT';
const DELETE_SPEC_ACT_SUCCESS='Blipay/admin/DELETE_SPEC_ACT_SUCCESS';
const DELETE_SPEC_ACT_FAIL='Blipay/admin/DELETE_SPEC_ACT_SUCCESS';
const WD_SPEC_ACT_AUTH='Blipay/admin/WD_SPEC_ACT_AUTH';
const WD_SPEC_ACT_AUTH_SUCCESS='Blipay/admin/WD_SPEC_ACT_AUTH_SUCCESS';
const WD_SPEC_ACT_AUTH_FAIL='Blipay/admin/WD_SPEC_ACT_AUTH_FAIL';

//查找特定用户
const USER_SEAERCH='Blipay/admin/USER_SEARCH';
const USER_SEARCH_SUCCESS='Blipay/admin/USER_SEARCH_SUCCESS';
const USER_SEARCH_FAIL='Blipay/admin/USER_SEARCH_FAIL';

//查询操作记录
const GET_ADMIN_LOG='Blipay/admin/GET_ADMIN_LOG';
const GET_ADMIN_LOG_SUCCESS='Blipay/admin/GET_ADMIN_LOG_SUCCESS';
const GET_ADMIN_LOG_FAIL='Blipay/admin/GET_ADMIN_LOG_SUCCESS';

//更新身份数据库
const UPDATE_ID='blipay/admin/UPDATE_ID';
const UPDATE_ID_SUCCESS='blipay/admin/UPDATE_ID_SUCCESS';
const UPDATE_ID_FAIL='blipay/admin/UPDATE_ID_FAIL';


const messages = {
  USER_NOT_EXIST: '当前用户名未注册。',
  INVALID_USERNAME_OR_PASSWORD: '用户名或密码错误。'
}

// 用户管理模块初始状态
const initialState = {
};

// 注册
export const adminRegister = (data) => ({
  types: [ADMIN_REGISTER,ADMIN_REGISTER_SUCCESS,ADMIN_REGISTER_FAIL],
  promise: (client) => client.post('/api/admin/register', data)
})
// 登录
export const login = (data) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: (client) => client.post('/api/admin/login', data)
});

export const getAdminLog = () => ({
    types: [GET_ADMIN_LOG, GET_ADMIN_LOG_SUCCESS, GET_ADMIN_LOG_FAIL],
    promise: (client) => client.get('/api/admin/log')
});

//获取管理员信息
export const loadAdminInfo = () => ({
  types: [LOAD_ADMIN_INFO, LOAD_ADMIN_INFO_SUCCESS, LOAD_ADMIN_INFO_FAIL],
  promise: (client) => client.get('/api/admin/info')
});

/*暂时不用
export const userList = () => ({
  type: USER_LIST
})
*/

//按用户名查询用户
//传入用户名
export const searchForUserName = (data)=>({
    types: [USER_SEARCH, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL],
    promise: (client) => clien.get('/api/admin/checkbyusername',data)
});

/*获取待认证列表*/
export const loadVerifyingList = () => ({
  types: [LOAD_VERIFYING_LIST, LOAD_VERIFYING_LIST_SUCCESS, LOAD_VERIFYING_LIST_FAIL],
  promise: (client) => client.get('/api/admin/verifyinglist')
});

/*获取仲裁信息列表*/
export const getArbitrationList = () => ({
  types: [ARBITRATION_LIST,ARBITRATION_LIST_SUCCESS,ARBITRATION_LIST_FAIL],
  promise: (client) => client.get('/api/admin/getarbitration')
});

/*建立管理员*/
/*传入adminName
*传入loginPass
*/
export const addAdmin = (data) => ({
  types: [ADD_ADMIN, ADD_ADMIN_SUCCESS, ADD_ADMIN_FAIL],
  promise: (client) => client.post('/api/admin/addadmin', data)
});

/*删除管理员*/
//传入adminName
export const deleteAdmin = (data) => ({
  types: [DELETE_ADMIN, DELETE_ADMIN_SUCCESS, DELETE_ADMIN_FAIL],
  promise: (client) => client.post('/api/admin/deleteadmin', data)
});

/*修改管理员等级*/
//传入adminName
//传入level: 在config/admin.js中有定义enum{LEVELUP,LEVELDOWN}
export const modifyAdminLevel = (data) =>({
    types: [MODIFY_ADMIN, MODIFY_ADMIN_SUCCESS, MODIFY_ADMIN_FAIL],
    promise: (client) => client.post('/api/admin/changelevel', data)
});

/*新建特殊账户*/
export const createSpecialAccount = (data) =>({
    types: [CREATE_SPEC_ACT, CREATE_SPEC_ACT_SUCCESS, CREATE_SPEC_ACT_FAIL],
    promise: (client) => client.post('/api/admin/create', data)
});

/*删除特殊账户*/
export const deleteSpecialAccount = (data) =>({
    types: [DELETE_SPEC_ACT, DELETE_SPEC_ACT_SUCCESS, DELETE_SPEC_ACT_FAIL],
    promise: (client) => client.post('/api/admin/delete', data)
});

/*撤销特殊账户权限*/
export const withdrawalSpecialAccountAuth = (data) =>({
    types: [WD_SPEC_ACT_AUTH,WD_SEPC_ACT_AUTH_SUCCESS,WD_SPEC_ACT_AUTH_FAIL],
    promise: (client) => client.post('/api/admin/withdrawal', data)
});


/*修改用户状态*/
/*暂时不用
export const modifyUser = (data) => ({
  types: [MODIFY_USER, MODIFY_USER_SUCCESS, MODIFY_USER_FAIL],
  promise: (client) => client.post('/admin/modifyuser', data)
})*/

/*手动解决仲裁*/
//传入订单id
//enum in{'ing','accept','deny'} 注意这里是字符串
export const dealArbitration = (data) => ({
  types: [ARBITRATION, ARBITRATION_SUCCESS, ARBITRATION_FAIL],
  promise: (client) => client.post('/api/admin/dealarbitration', data)
});

/*更新身份数据库*/
//传入realName
//传入idNumber
export const uopdateIdBase = (data) => ({
  types: [UPDATE_ID, UPDATE_ID_SUCCESS, UPDATE_ID_FAIL],
  promise: (client) => client.post('/api/admin/updateidbase', data)
});

/*手动验证*/
/*传入userName
*/
export const verify = (data) =>({
  types: [VERIFY, VERIFY_SUCCESS, VERIFY_FAIL],
  promise: (client) => client.post('/api/admin/verify',data)
});

// Helper
/*
const wrapTransaction = (e) => ({
  ...e,
  createdAt: new Date(e.createdAt),
  updatedAt: new Date(e.updatedAt)
});
*/

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/admin/panel/welcome'))
      }, 0)
      return {
        ...state,
        adminer: action.result.admin,
        message: null
      }
    case LOGOUT_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/admin'))
      }, 0)
      return {
        ...state,
        user: null,
        message: null
      }
    case GET_ADMIN_LOG_SUCCESS:
      return{
        ...state,
        logs: action.result.logs
      }
    case USER_SEARCH_SUCCESS:
      return{
        ...state,
        user: action.result.user,
        message: null
      }
    case LOAD_ADMIN_INFO_SUCCESS:
      return {
        ...state,
        admin: action.result.admin
      }
    case ARBITRATION_LIST_SUCCESS:
      return {
        ...state,
        arbitrationList: action.result.arbitrationList,
        message: null
      }
    case LOAD_VERIFYING_LIST_SUCCESS:
      return {
        ...state,
        verifyingUsers: action.result.verifyingUsers,
      }
    case VERIFY_SUCCESS:
      // 更新用户信息
      const updated = action.result.user
      const index = _.findIndex(state.verifyingUsers, ['id', updated.id])
      return {
        ...state,
        verifyingUsers: [...state.verifyingUsers.slice(0, index),
                         { ...state.verifyingUsers[index], ...updated },
                         ...state.verifyingUsers.slice(index + 1)]
      }
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        message: null
      }
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        message: null
      }
    case MODIFY_ADMIN_SUCCESS:
      return {
        ...state,
        message: null
      }
    case MODIFY_USER_SUCCESS:
      return {
        ...state,
        message: null
      }
    case VERIFY_SUCCESS:
      return {
        ...state,

        message: null
      }
    case ARBITRATION_SUCCESS:
      if (action.result.op=='accept') {
        message.success('仲裁要求已接受');
      }else{
        message.success('仲裁要求已拒绝');
      }
      return {
        ...state,
        message: null
      }
    // Errors
    case ADD_ADMIN_FAIL:
    case DELETE_ADMIN_FAIL:
    case MODIFY_ADMIN_FAIL:
    case MODIFY_USER_FAIL:
    case VERIFY_FAIL:
    case ARBITRATION_FAIL:
    case ARBITRATION_LIST_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
    case UPDATE_ID_FAIL:
      return {
        ...state,
        message: (action.error.type && messages[action.error.type]) || '未知错误'
      }
    default:
      return state
  }
}
