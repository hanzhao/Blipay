const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('item', {
    price: {
      type: Sequelize.DECIMAL(10, 2)
    },
    remain: {
      type: Sequelize.INTEGER                     
    },
    name: {
      type: Sequelize.STRING
    },
    thumb: {
      type: Sequelize.STRING
    }
  });
};
