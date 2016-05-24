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
const CartItem = require('./cartItem')(db);
const Review = require('./review')(db);

// 表关联
Item.belongsTo(User, {
  as: 'seller'
});

Transaction.belongsTo(User);
User.hasMany(Transaction);

Order.belongsTo(User, { as: 'seller' });
Order.belongsTo(User, { as: 'buyer' });
Order.belongsToMany(Item, { through: OrderItem });

Item.hasMany(Review);
User.hasbelongsToManyMany(Items), {through: CartItem};

const initDatabase = Promise.coroutine(function* () {
  for (let t of [User, Item, Transaction, Order, OrderItem, Review]) {
    yield t.sync();
    console.log(`Table ${t.name} synced`);
  }
})
initDatabase()

module.exports = {
  User, Item, Transaction, Order, OrderItem, Review,
  db
};
