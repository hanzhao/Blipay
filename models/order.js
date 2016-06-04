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
    /* 地址 */
    addr: {
      type: Sequelize.STRING
    },
    /* 转账交易信息 */
    buyerTransId: {
      type: Sequelize.INTEGER
    },
    sellerTransId: {
      type: Sequelize.INTEGER
    },
    /* 买家退款 需要改命名 */
    refundTransId: {
      type: Sequelize.INTEGER
    },
    /* 卖家退款 */
    sellerRefundTransId: {
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
