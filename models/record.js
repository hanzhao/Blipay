const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('record', {
    pay: {
      type: Sequelize.DECIMAL(12, 2)
    },
    receive: {
      type: Sequelize.DECIMAL(12, 2)
    },
    comment: {
      type: Sequelize.STRING
    },
    discount: {
      type: Sequelize.STRING
    }
  });
};