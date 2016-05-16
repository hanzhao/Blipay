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

Order.belongsTo(User, {as: 'seller'});
Order.belongsTo(User, {as: 'buyer'});
Order.belongsToMany(Item, {through: OrderItem});

const report = (msg) => {
  console.log(`Error accessing database with following error message.\n${msg}`);
};

User.sync().then(() => {
  // id为1的用户将作测试用
  User.findOne({ where: { id: 1 } })
    .then((user) => {
      if (user) {
        User.update({ userName: 'xxx', balance: 0 }, { where: { id: 1 } })
          .catch((err) => { report(err.message); });
      } else {
        User.create({ userName: 'xxx', balance: 0 })
          .catch((err) => { report(err.message); });
      }
    }).catch((err) => { report(err.message); });
});


[Item, Transaction, Order, OrderItem].forEach((t) => {
  t.sync().then(() => {
    console.log(`Table ${t.name} synced`);
  });
});




module.exports = {
  User, Item, Transaction, Order, OrderItem
};
