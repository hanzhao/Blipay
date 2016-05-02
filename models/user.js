const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('user', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
};
