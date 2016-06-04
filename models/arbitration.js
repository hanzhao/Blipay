const Sequelize=require('sequelize');
module.exports=(db)=>{
    return db.define('arbitration',{
        userName:{
            type: Sequelize.STRING, allowNull : false
        },
        //投诉对象
        complained:{
            type: Sequelize.STRING, allowNull : false
        },
        content:{
            type: Sequelize.STRING
        },
        state:{
            type: Sequelize.STRING, isIn: [['ing','accept','deny']]
        },
        /* 退款理由等信息 */
        orderId: {
            type: Sequelize.INTEGER
        },
        buyerText: {
            type: Sequelize.TEXT
        },
        sellerText: {
            type: Sequelize.TEXT
        }
    });
};
