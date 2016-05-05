const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('hotel', {
    remain: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    addr: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL(12, 2)
    },
    score: {
      type: Sequelize.STRING
    },
    hot: {
      type: Sequelize.STRING
    }
  });
};
