/*
 * 存放流水记录
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('record', {
    /* 订单价格 */
    totalCost: {
      type: Sequelize.DECIMAL(10, 2)
    },
    orderId: {
      type: Sequelize.INTEGER,
      unique: true
    },
    /*买家付款*/
    buyerPay: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /*卖家收款*/
    sellerGet: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 状态 */
    status: {
      type: Sequelize.INTEGER
    },
    /*错误类型*/
    wrongStatus:{
      type: Sequelize.INTEGER
    },
    /*infomation*/
    info:{
            type: Sequelize.STRING
        },
    /*买家卖家id,转账id*/
  });
};
