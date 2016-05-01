const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('item', {
    remain: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    picUrl: {
      type: Sequelize.STRING
    },
    price: Sequelize.DECIMAL(12, 2)
  });
};
