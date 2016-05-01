const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('order', {
    itemCount: {
      type: Sequelize.INTEGER
    },
    cost: {
      type: Sequelize.DECIMAL(12, 2)
    },
    confirm:{
      type: Sequelize.BOOLEAN
    },
    payRes:{
      type: Sequelize.BOOLEAN
    },
    refund:{
      type: Sequelize.BOOLEAN
    },
    pay: {
      type: Sequelize.DECIMAL(12, 2)
    },
    receive: {
      type: Sequelize.DECIMAL(12, 2)
    }
  });
};
