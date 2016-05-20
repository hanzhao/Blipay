const Sequelize=require('sequelize');
module.exports=(db)=>{
    return db.define('arbitraion',{
        userName:{
            type: Sequelize.STRING, allowNull = false
        }
        content:{
            type: Sequelize.STRING
        }
        state:{
            type: Sequelize.STRING, isIn: [['ing','done']]
        }
    });
};
