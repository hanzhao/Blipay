const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('item', {
    price: Sequelize.DECIMAL(12, 2)
  });
};
