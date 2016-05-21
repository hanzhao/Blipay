const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('auditor', {
    /* 用户名 */
    userName: {
      type: Sequelize.STRING, 
      unique: true,
      allowNull: false
    },
    /* 登录密码盐 */
    loginSalt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    /* 登录密码 */
    loginPass: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};