/*
*used for information of admin
*/
const Sequelize = require('sequelize');

module.exports = (db) =>{
  return db.define('admin',{
    adminName:{
      type: Sequelize.STRING, unique: true, allowNull: false
    },
    loginPass:{
      type: Sequelize.STRING, allowNull:false
    },
    realName:{
      type: Sequelize.STRING
    },
    idNumber:{
      type: Sequelize.STRING, unique: true
    },
    email:{
      type: Sequelize.STRING
    },
    phone:{
      type: Sequelize.STRING
    },
    loginSalt:{
      type: Sequelize.STRING, allowNull: false
    },
    // 0 超级管理 1 管理 2 审计
    level: {
      type: Sequelize.INTEGER, allowNull:false
    },
    disabled: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  });
};
