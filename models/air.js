const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('air', {
    src: {
      type: Sequelize.STRING
    },
    des: {
      type: Sequelize.STRING
    },
    stop: {
      type: Sequelize.STRING
    },
    start: {
      type: Sequelize.STRING
    },
    arrive: {
      type: Sequelize.STRING
    },
    discount: {
      type: Sequelize.STRING
    }
  });
};