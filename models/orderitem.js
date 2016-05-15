const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('OrderItem', {
    /* 订单中该商品数量 */
    count: {
      type: Sequelize.INTEGER,
      validate: {
        notNull: true
      }
    },
    /* 订单中该商品总价 */
    cost: {
      type: Sequelize.DECIMAL(10, 2),
      validate: {
        notNull: true
      }
    }
  });
};
