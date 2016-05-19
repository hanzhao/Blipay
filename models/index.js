'use strict'
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
const Order = require('./order')(db);
const OrderItem = require('./orderitem')(db);
// 表关联
Item.belongsTo(User, {
  as: 'seller'
});
Transaction.belongsTo(User);

Order.belongsTo(User, { as: 'seller' });
Order.belongsTo(User, { as: 'customer' });
Order.belongsToMany(Item, { through: OrderItem });

// Sync table to database
(Promise.coroutine(function* () {
  for (let t of [User, Item, Transaction, Order, OrderItem]) {
    yield t.sync({ force: true })
    console.log(`Table ${t.name} synced`);
  }
}))()

module.exports = {
  User, Item, Transaction, Order, OrderItem
};
