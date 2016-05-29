const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('item', {
    /* 价格 */
    price: {
      type: Sequelize.DECIMAL(10, 2)
    },
    /* 库存 */
    remain: {
      type: Sequelize.INTEGER
    },
    /* 名称 */
    name: {
      type: Sequelize.STRING
    },
    /* 简介 */
    description: {
      type: Sequelize.TEXT
    }
  });
};
