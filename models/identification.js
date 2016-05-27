/*
* 身份数据库
*/
Sequelize=require('sequelize');
module.exports=(db)=>{
    return db.define('identification',{
        realName:{
            type:Sequelize.STRING, allowNull: false
        },
        idNumber:{
            type:Sequelize.STRING, allowNull: false, unique: true
        }
    });
};
