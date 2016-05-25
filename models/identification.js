/*
* 身份数据库
*/
Squelize=require('Squelize');
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
