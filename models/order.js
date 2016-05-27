/*
 * 存放订单
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('order', {
<<<<<<< HEAD
    /* 订单价格 */
    totalCost: {
=======
    /* 商品总数 */
    count: {
      type: Sequelize.INTEGER
    },
    /* 订单价格 */
    cost: {
>>>>>>> ac6e5dd1f1a982cc515dd8e25514bf5dcab79f79
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
<<<<<<< HEAD
    },
=======
    }
>>>>>>> ac6e5dd1f1a982cc515dd8e25514bf5dcab79f79
  });
};
