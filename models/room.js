const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('room', {
    /* 价格 */
    price: {
      type: Sequelize.INTEGER
    },
    /* 名称 */
    name: {
      type: Sequelize.STRING
    },
    /* 简介 */
    description: {
      type: Sequelize.TEXT
    },
    /* 隐藏 */
    disabled: {
      type: Sequelize.INTEGER
    }
  });
};
