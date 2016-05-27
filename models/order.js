/*
 * 存放订单
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('order', {
    /* 商品总数 */
    count: {
      type: Sequelize.INTEGER
    },
    /* 订单价格 */
    totalCost: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 状态 */
    status: {
      type: Sequelize.INTEGER
    },
    /* 转账交易信息 */
    buyerTransId: {
      type: Sequelize.INTEGER
    },
    sellerTransId: {
      type: Sequelize.INTEGER
    },
    refundTransId: {
      type: Sequelize.INTEGER
    },
    /* 退款理由等信息 */
    buyerText: {
      type: Sequelize.TEXT
    },
    sellerText: {
      type: Sequelize.TEXT
    },
    buyerRes: {
      type: Sequelize.TEXT
    },
    sellerRes: {
      type: Sequelize.TEXT
    }
  });
};