const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('company', {
    name: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    score: {
      type: Sequelize.STRING
    }
  });
};
