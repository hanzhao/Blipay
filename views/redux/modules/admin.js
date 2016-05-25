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

const messages = {
  USER_NOT_EXIST: '当前用户名未注册。',
  INVALID_USERNAME_OR_PASSWORD: '用户名或密码错误。'
}

// 用户管理模块初始状态
const initialState = {
  user: null,
  message: null,
  adminInfo: null,
  userList: null,
  verificationList: null,
  arbitrationList: null,
  adminLog: null
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

export const getAdminLog = () =>({
    types: [GET_ADMIN_LOG, GET_ADMIN_LOG_SUCCESS, GET_ADMIN_LOG_FAIL],
    promise: (client) => client.get('/api/admin/log')
});

//获取管理员信息
export const adminInfo = () => ({
  type: ADMIN_INFO,
  promise: (client) => client.get('/api/admin/admininfo')
});

/*暂时不用
export const userList = () => ({
  type: USER_LIST
})
*/

export const searchForUserName = (data)=>({
    types: [USER_SEARCH, USER_SEARCH_SUCCESS, USER_SEARCH_FAIL],
    promise: (client) => clien.get('/api/admin/checkbyusername',data)
});

/*获取待认证列表*/
export const verificationList = () => ({
  type: VERIFICATION_LIST,
  promise: (client) => client.get('/api/admin/verifylist')
});

/*获取仲裁信息列表*/
export const arbitrationList = () => ({
  type: ARBITRATION_LIST,
  promise: (client) => client.get('/api/admin/getarbitration')
});

/*建立特殊账户*/
export const addAdmin = (data) => ({
  types: [ADD_ADMIN, ADD_ADMIN_SUCCESS, ADD_ADMIN_FAIL],
  promise: (client) => client.post('/api/admin/addadmin', data)
});

/*删除特殊账户*/
export const deleteAdmin = (data) => ({
  types: [DELETE_ADMIN, DELETE_ADMIN_SUCCESS, DELETE_ADMIN_FAIL],
  promise: (client) => client.post('/api/admin/deleteadmin', data)
});

/*修改管理员等级*/
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
export const arbitration = (data) => ({
  types: [ARBITRATION_PASS, ARBITRATION_SUCCESS, ARBITRATION_FAIL],
  promise: (client) => client.post('/api/admin/dealarbitration', data)
});

/*更新身份数据库*/
export const uopdateIdBase = (data) => ({
  types: [VERIFICATION, VERIFICATION_SUCCESS, VERIFICATION_FAIL],
  promise: (client) => client.post('/api/admin/updateidbase', data)
});

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      setTimeout(() => {
        store.dispatch(push('/admin/account/welcome'))
      }, 0)
      return {
        ...state,
        user: action.result.admin,
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
        adminLog: action.result.log,
        message: null
      }
    case USER_SEARCH_SUCCESS:
      return{
        ...state,
        user: action.result.user,
        message: null
      }
    case ADMIN_INFO:
      return {
        ...state,
        adminInfo: action.result.adminInfo,
        message: null
      }
    /*case USER_LIST:
      return {
        ...state,
        userList: true,
        adminInfo: false,
        verificationList: false,
        arbitrationList: false
      }
      */
    case ADD_ADMIN:
      return {
        ...state,
        message: null
      }
    case DELETE_ADMIN:
      return {
        ...state,
        message: null
      }
    case MODIFY_ADMIN:
      return {
        ...state,
        message: null
      }
    case MODIFY_USER:
      return {
        ...state,
        message: null
      }
    case VERIFICATION_LIST:
      return {
        ...state,
        verificationList: action.result.unverifieduser,
        message :null
      }
    case ARBITRATION_LIST:
      return {
        ...state,
        arbitrationList: result.action.arbitrations,
        message: null
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
    case VERIFICATION_SUCCESS:
      return {
        ...state,
        verificationList: action.result.unVerifiedUser,
        message: null
      }
    case ARBITRATION_SUCCESS:
      return {
        ...state,
        arbitrationList: arbitrations,
        message: null
      }
    // Errors
    case ADD_ADMIN_FAIL:
    case DELETE_ADMIN_FAIL:
    case MODIFY_ADMIN_FAIL:
    case MODIFY_USER_FAIL:
    case VERIFICATION_FAIL:
    case ARBITRATION_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        message: (action.error.type && messages[action.error.type]) || '未知错误'
      }
    default:
      return state
  }
}
