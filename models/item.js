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
<<<<<<< HEAD
    /* 简介 */
    description: {
      type: Sequelize.TEXT
=======
    /* 图片 URL */
    thumb: {
      type: Sequelize.STRING
>>>>>>> ac6e5dd1f1a982cc515dd8e25514bf5dcab79f79
    }
  });
};
