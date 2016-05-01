const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('order', {
    count: {
      type: Sequelize.INTEGER
    },
    cost: {
      type: Sequelize.DECIMAL(10, 2)
    },
    isPayed: {
      type: Sequelize.BOOLEAN
    },
    isConfirmed: {
      type: Sequelize.BOOLEAN
    },
    isRefunding: {
      type: Sequelize.BOOLEAN
    }
  });
};
