/*record the operation of admin on users*/
const Sequelize = require('sequelize');

module.exports = (db) =>{
    return db.define('adminlog',{
        content:{
            type: Sequelize.STRING, allowNull: false
        },
        adminName:{
            type: Sequelize.STRING, allowNull: false
        },
        userName:{
            type: Sequelize.STRING, allowNull: false
        }
    });
};
