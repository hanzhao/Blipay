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

const report = (msg) => {
  console.log(`Error accessing database with following error message.\n${msg}`);
};

// id为1的用户将作测试用
User.findOne({where: {id: 1 } })
  .then((user) => {
    if(user) {
      User.update({userName: 'xxx', balance: 0}, {where: {id: 1}})
        .catch((err) => {report(err.message);});
    } else {
      User.create({userName: 'xxx', balance: 0})
        .catch((err) => {report(err.message);});
    }
  }).catch((err) => {report(err.message);});

module.exports = {
  User, Item, Transaction
};
