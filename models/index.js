const Sequelize = require('sequelize');
const config = require('../config').database;

const db = new Sequelize(config.db, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool
});

const User = require('./user')(db);
const Item = require('./item')(db);
const Order = require('./order')(db);
const OrderItem = db.define('OrderItem');


// 表关联
Item.belongsTo(User, {as: 'seller'});

Order.belongsTo(User, {as: 'seller'});
Order.belongsTo(User, {as: 'customer'});
Order.belongsToMany(Item, {through: OrderItem});

[User, Item, Order, OrderItem].forEach((t) => {
  t.sync().then(() => {
    console.log(`Table ${t.name} synced`);
  });
});

module.exports = {
  User, Item, Order
};
