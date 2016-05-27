/*
 * 存放审计流水记录
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('record', {
    /* 订单价格 */
    cost: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 买家金额变动 */
    customerTrans: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 卖家金额变动 */
    sellerTrans: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 状态 */
    status: {
      type: Sequelize.INTEGER
    },
    /*錯誤狀態*/
    wrongType: {
      type: Sequelize.INTEGER
    },
    /*bei zhu*/
    info: {
      type: Sequelize.STRING
    }
  });
};
