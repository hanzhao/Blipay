'use strict'

const Promise = require('bluebird');
const Item = require('../../models').Item;
const User = require('../../models').User;

const newItem = (userId, item) => {
  Promise.coroutine(function* () {
    try {
      const user = yield User.findOne({ where: { id: 1 } });
      if (item.remain < 0 || item.price < 0) {
        throw new Error("illegal parameter.");
      }
      const newItem = yield Item.create({
        name: item.name,
        price: item.price,
        remain: item.remain,
        thumb: item.thumb
      });
      yield newItem.setSeller(user);
    }
    catch (e) {
      console.error('Error in service newItem:' + e.message);
      throw new Error('Error in service newItem:' + e.message);
    }
  });
};
