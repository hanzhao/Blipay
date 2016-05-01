const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('hotelorder', {
    userName: {
      type: Sequelize.STRING
    },
    orderTime: {
      type: Sequelize.STRING
    },
    inTime: {
      type: Sequelize.STRING
    },
    outTime: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    },
    discount: {
      type: Sequelize.STRING
    }
  });
};