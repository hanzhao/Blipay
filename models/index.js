const Sequelize = require('sequelize');
const config = require('../config').database;

const db = new Sequelize(config.db, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});

const User = require('./user')(db);
const Item = require('./item')(db);
const Transaction = require('./transaction')(db);

// 表关联
Item.belongsTo(User, {
  as: 'seller'
});
Transaction.belongsTo(User);

[User, Item, Transaction].forEach((t) => {
  t.sync().then(() => {
    console.log(`Table ${t.name} synced`);
  });
});

module.exports = {
  User, Item, Transaction
};
