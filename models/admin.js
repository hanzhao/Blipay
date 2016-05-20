/*
*used for information of admin
*/
const Sequelize = require('sequelize');

module.exports = (db) =>{
    return db.define('admin',{
        adminName:{
            type: Sequelize.STRING, unique: true, allowNull: false
        }
        loginpass:{
            type: Sequelize.STRING, allowNull:false
        }
        realName:{
            type: Sequelize.STRING
        }
        idNumber:{
            type: Sequelize.STRING, unique: true
        }
        email:{
            type: Sequelize.STRING
        }
        phone:{
            type: Sequelize.STRING
        }
        loginSalt:{
            type: Sequelize.STRING, allowNull: false
        }
    });
};
