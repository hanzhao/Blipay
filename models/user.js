/*
 * 用于存放用户信息的数据表
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('user', {
    /* 用户名 */
    userName: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    /* 密码盐 */
    salt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    /* 登录密码 */
    loginPass: {
      type: Sequelize.STRING,
      allowNull: false
    },
    /* 支付密码 */
    payPass: {
      type: Sequelize.STRING,
      allowNull: false
    },
    /* 真实姓名 */
    realName: {
      type: Sequelize.STRING
    },
    /* 身份证号 */
    idNumber: {
      type: Sequelize.STRING,
      unique: true
    },
    /* 邮箱地址 */
    email: {
      type: Sequelize.STRING
    },
    /* 电话号码 */
    phone: {
      type: Sequelize.STRING
    },
    /* 上次登录时间 */
    lastLogin: {
      type: Sequelize.DATE
    },
    /* 账户余额 */
    balance: {
      type: Sequelize.DECIMAL(12, 2),
      defaultValue: 0
    },
    disabled: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    /* 实名验证状态, 0为未验证，1为审核中，2为通过验证 */
    status: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    cardFront: {
      type: Sequelize.INTEGER
    },
    cardBack: {
      type: Sequelize.INTEGER
    },
    booker: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    address: {
      type: Sequelize.STRING
    }
  });
};
