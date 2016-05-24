const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('order_item', {
    /* 订单中该商品数量 */
    count: {
      type: Sequelize.INTEGER
    },
    /* 订单中该商品总价 */
    cost: {
      type: Sequelize.DECIMAL(10, 2)
    }
  });
};
