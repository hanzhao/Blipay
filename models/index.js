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
const OrderItem = require('./order_item')(db);
const Review = require('./review')(db);
const Attachment = require('./attachment')(db);
const ItemAttachment = require('./item_attachment')(db);
const Record = require('./record')(db);

// 表关联
const ItemSeller = Item.belongsTo(User, {
  as: 'seller'
});

Transaction.belongsTo(User);
User.hasMany(Transaction);

Order.belongsTo(User, { as: 'seller' });
Order.belongsTo(User, { as: 'buyer' });
Order.belongsToMany(Item, { through: OrderItem });

Item.hasMany(Review);

Record.belongsTo(User, { as: 'seller' });
Record.belongsTo(User, { as: 'buyer' });
Record.belongsTo(Transaction, { as: 'seller' });
Record.belongsTo(Transaction, { as: 'buyer' });

Attachment.belongsTo(User)
Attachment.belongsToMany(Item, { through: ItemAttachment })
Item.belongsToMany(Attachment, { through: ItemAttachment })
User.hasMany(Attachment)

const initDatabase = Promise.coroutine(function* () {
  for (let t of [User, Item, Transaction, Order,
                 OrderItem, Review, Attachment, ItemAttachment]) {
    yield t.sync();
    console.log(`Table ${t.name} synced`);
  }
})
initDatabase()

module.exports = {
  User, Item, Transaction, Order, OrderItem, Review, Attachment,
  ItemSeller, ItemAttachment,
  db
};
