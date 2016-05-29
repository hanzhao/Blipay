/*record the operation of admin on users*/
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('admin_log',{
    content:{
      type: Sequelize.TEXT, allowNull: false
    }
  });
};
