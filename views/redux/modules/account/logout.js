/*
 * TODO: 与login合并为auth
 */
const LOGOUT = 'Blipay/account/LOGOUT';
const LOGOUT_SUCC = 'Blipay/account/LOGOUT_SUCC';
const LOGOUT_FAIL = 'Blipay/account/LOGOUT_FAIL';

export default (state = {}, action) => {
  switch(action.type) {
  default:
    return state;
  }
};

export const logout = () => {
  return {
    types: [
      LOGOUT,
      LOGOUT_SUCC,
      LOGOUT_FAIL
    ],
    promise: (client) => {
      console.log('in logout promise');
      return client.post('/account/logout');
    }
  };
};
