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
    salt:{
      type: Sequelize.STRING, allowNull: false
    },
    // 0超级管理 1管理 2审计 4系统
    level: {
      type: Sequelize.INTEGER, allowNull:false
    },
    disabled: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  });
};
