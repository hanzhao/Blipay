const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('OrderItem',{
    /* 订单中商品数量 */
    count: {
      type: Sequelize.INTEGER,
      validate: {
        notNull: true
      }
    }
  });
};
