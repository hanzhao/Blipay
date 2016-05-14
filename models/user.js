/*
 * 用于存放用户信息的数据表
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('user', {
    /* 用户名 */
    username: {
      type: Sequelize.STRING, unique: true
    },
    /* 登录密码 */
    loginpass: {
      type: Sequelize.STRING
    },
    /* 支付密码 */
    paypass: {
      type: Sequelize.STRING
    },
    /* 真实姓名 */
    realName: {
      type: Sequelize.STRING
    },
    /* 身份证号 */
    idNumber: {
      type: Sequelize.STRING, unique: true
    },
    /* 邮箱地址 */
    email: {
      type: Sequelize.STRING
    },
    /* 电话号码 */
    phone: {
      type: Sequelize.STRING
    },
    /* 账户余额 */
    balance: {
      type: Sequelize.DECIMAL(12, 2)
    }
  });
};
