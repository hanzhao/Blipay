const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('review', {
    score: {
      type: Sequelize.INTEGER
    },
    text: {
      type: Sequelize.TEXT
    }
  });
};
