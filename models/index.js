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
const Hotel = require('./hotel')(db);
const Room = require('./room')(db);
const Hotelorder = require('./hotelorder')(db);
const Company = require('./company')(db);
const Air = require('./air')(db);
const Airorder = require('./airorder')(db);

// 表关联
Item.belongsTo(User, {
  as: 'seller'
});

Order.belongsTo(User, {
  as: 'seller'
});
Order.belongsTo(User, {
  as: 'buyer'
});
Order.belongsTo(Item);

Room.belongsTo(Hotel);

Hotelorder.belongsTo(User);
Hotelorder.belongsTo(Room);
Hotelorder.belongsTo(Hotel);

Air.belongsTo(Company);

Airorder.belongsTo(User);
Airorder.belongsTo(Air);
Airorder.belongsTo(Company);

[User, Item, Order, Hotel, Room, Hotelorder, Company, Air, Airorder].forEach((t) => {
  t.sync().then(() => {
    console.log(`Table ${t.name} synced`);
  });
});

module.exports = {
  User, Item, Order, Hotel, Room, Hotelorder, Company, Air, Airorder
};
