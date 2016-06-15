'use strict'
const Sequelize = require('sequelize');
const config = require('../config').database;

const db = new Sequelize(config.db, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: config.pool,
  logging: false,
  timezone: '+08:00'
});

const User = require('./user')(db);
const Item = require('./item')(db);
const Room = require('./room')(db);
const Transaction = require('./transaction')(db);
const Order = require('./order')(db);
const OrderItem = require('./order_item')(db);
const Review = require('./review')(db);
const Attachment = require('./attachment')(db);
const ItemAttachment = require('./item_attachment')(db);

const Admin = require('./admin')(db);
const Specialaccount = require('./specialaccount')(db);
const AdminLog = require('./admin_log')(db);
const Arbitration = require('./arbitration')(db);
const Identification = require('./identification')(db);

const Record = require('./record')(db);
const Logtable = require('./logtable')(db);
// 表关联
const ItemSeller = Item.belongsTo(User, {
  as: 'seller'
});

Room.belongsTo(User);
User.hasMany(Room);

Transaction.belongsTo(User);
User.hasMany(Transaction);

Order.belongsTo(User, { as: 'seller' });
Order.belongsTo(User, { as: 'buyer' });
Order.belongsToMany(Item, { through: OrderItem });

Record.belongsTo(User, { as: 'seller' });
Record.belongsTo(User, { as: 'buyer' });

Logtable.belongsTo(User, { as: 'seller' });
Logtable.belongsTo(User, { as: 'buyer' });

Review.belongsTo(User)
Item.hasMany(Review);
User.hasMany(Review)

Attachment.belongsTo(User)
Attachment.belongsToMany(Item, { through: ItemAttachment })
Item.belongsToMany(Attachment, { through: ItemAttachment })
AdminLog.belongsTo(Admin)
User.hasMany(Attachment)

const initDatabase = Promise.coroutine(function* () {
  for (let t of [User, Item, Transaction, Order, Room,
                 OrderItem, Review, Attachment, ItemAttachment,
                 Admin, AdminLog, Arbitration, Identification, Specialaccount, Record, Logtable]) {
    yield t.sync();
    // console.log(`Table ${t.name} synced`);
  }
})
initDatabase()

module.exports = {
  User, Item, Transaction, Order, OrderItem, Review, Attachment,
  ItemSeller, ItemAttachment, Room,
  Admin, AdminLog, Arbitration, Identification, Specialaccount, Record, Logtable,
  db,
};
