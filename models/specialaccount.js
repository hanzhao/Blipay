const Sequelize=require('sequelize');
module.exports = (db) =>{
    return db.define('specialaccount',{
        /*account name*/
        name:{
            type: Sequelize.STRING, unique: true, allowNull: false
        },
        /*authority type is defined in ../config/admin*/
        authority:{
            type: Sequelize.INTEGER, allowNull: false
        },
        /*password*/
        loginPass:{
            type: Sequelize.STRING, allowNull: false
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
        }
    }
    );
};
