const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('room', {
    roomId: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL(12, 2)
    },
    state: {
      type: Sequelize.BOOLEAN
    },
    dicount: {
      type: Sequelize.STRING
    }
  });
};
