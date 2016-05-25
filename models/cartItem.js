const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('cartItem', {
    /* 该商品数量 */
    count: {
      type: Sequelize.INTEGER
    }
  });
};
