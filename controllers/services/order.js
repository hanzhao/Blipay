'use strict';

const Promise = require('bluebird');
const Item = require('../../models').Item;
const User = require('../../models').User;
const Order = require('../../models').Order;

const createItem = (sellerId, item) => {
  console.log('service: createItem:');
  console.log(item);
  Promise.coroutine(function* () {
    try {
      const user = yield User.findOne({ where: { id: sellerId } });
      if (!user) {
        throw new Error('User Not Found.');
      }
      if (item.remain < 0 || item.price < 0) {
        throw new Error('illegal parameter.');
      }
      const newItem = yield Item.create({
        name: item.name,
        price: item.price,
        remain: item.remain,
        thumb: item.thumb
      });
      console.log('newItemId: ' + newItem.id);
      newItem.setSeller(user);
    }
    catch (e) {
      console.error('Error in service newItem:' + e.message);
    }
  })();
};

const createOrder = (sellerId, buyerId, count, cost, items) => {
  console.log('service: createOrder:');
  console.log(item);
  Promise.coroutine(function* () {
    try {
      const seller = yield User.findOne({ where: { id: sellerId } });
      const buyer = yield User.findOne({ where: { id: buyerId } });
      if (!seller || !buyer) {
        throw new Error('User Not Found');
      }
      const newOrder = yield Order.create({
        
      });
      items.forEach(function (element) {
        let item = yield Item.findOne({ where: { id: element.itemId } });
        if (!item) {
          throw new Error('Item Not Found.');
        }

      }, this);
    }
    catch (e) {
      console.error('Error in service newOrder:' + e.message);
    }
  })();
}

module.exports = {
  createItem
};
