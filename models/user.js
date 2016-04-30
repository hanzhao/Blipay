const Sequelize = require('sequelize');

module.exports = (db) => {
  const User = db.define('user', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  if (!global.isProduction) {
    User.sync().then(() => {
      console.log('Table `User` created');
    });
  }
  return User;
};
