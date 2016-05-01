const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('user', {
    username: {
      type: Sequelize.STRING, unique: true
    },
    loginpass: {
      type: Sequelize.STRING
    },
    paypass: {
      type: Sequelize.STRING
    },
    realname: {
      type: Sequelize.STRING
    },
    idnumber: {
      type: Sequelize.STRING, unique: true
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    balance: {
      type: Sequelize.DECIMAL(12, 2)
    }
  });
};
