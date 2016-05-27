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
<<<<<<< HEAD
const OrderItem = require('./order_item')(db);
const Review = require('./review')(db);
const Attachment = require('./attachment')(db);
const ItemAttachment = require('./item_attachment')(db);
const Record = require('./record')(db);

=======
const OrderItem = require('./orderitem')(db);
>>>>>>> ac6e5dd1f1a982cc515dd8e25514bf5dcab79f79
// 表关联
const ItemSeller = Item.belongsTo(User, {
  as: 'seller'
});

Transaction.belongsTo(User);
User.hasMany(Transaction);

Order.belongsTo(User, { as: 'seller' });
Order.belongsTo(User, { as: 'buyer' });

Item.hasMany(Review);

Attachment.belongsTo(User)
Attachment.belongsToMany(Item, { through: ItemAttachment })
Item.belongsToMany(Attachment, { through: ItemAttachment })
User.hasMany(Attachment)

<<<<<<< HEAD
Record.belongsTo(User, { as: 'seller' });
Record.belongsTo(User, { as: 'buyer' });
Record.belongsTo(Order);

const initDatabase = Promise.coroutine(function* () {
  for (let t of [User, Item, Transaction, Order,
                 OrderItem, Review, Attachment, ItemAttachment]) {
    yield t.sync();
=======
Order.belongsTo(User, {as: 'seller'});
Order.belongsTo(User, {as: 'customer'});
Order.belongsToMany(Item, {through: OrderItem});

[User, Item, Transaction, Order, OrderItem].forEach((t) => {
  t.sync().then(() => {
>>>>>>> ac6e5dd1f1a982cc515dd8e25514bf5dcab79f79
    console.log(`Table ${t.name} synced`);
  }
})
initDatabase()

module.exports = {
<<<<<<< HEAD
  User, Item, Transaction, Order, OrderItem, Review, Attachment,
  ItemSeller, ItemAttachment,
  db
=======
  User, Item, Transaction, Order, OrderItem
>>>>>>> ac6e5dd1f1a982cc515dd8e25514bf5dcab79f79
};
/*
Order.build({
	id: 1,
	totalCost: 10,
	status: 3,
	buyerId: 1,
	sellerId: 1,
	buyerTransId:1,
    sellerTransId: 2
}).save();

Order.build({
	id: 2,
	totalCost: 20,
	status: 1, 
	buyerTransId:3,
    sellerTransId: 4
}).save();
*/
