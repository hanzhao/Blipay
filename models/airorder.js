const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('airorder', {
    userName: {
      type: Sequelize.STRING
    },
    orderTime: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    },
    discount: {
      type: Sequelize.STRING
    },
    cost: {
      type: Sequelize.DECIMAL(12, 2)
    }
  });
};
