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
    cost: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 状态 */
    status: {
      type: Sequelize.INTEGER
    },
    /* 买家金额变动 */
    customerTrans: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 卖家金额变动 */
    sellerTrans: {
      type: Sequelize.DECIMAL(10, 2)
    }
  });
};