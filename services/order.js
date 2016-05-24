'use strict';
const Promise = require('bluebird');
const Item = require('../models').Item;
const User = require('../models').User;
const Order = require('../models').Order;

const createItem = Promise.coroutine(function* (sellerId, item) {
  console.log('service: createItem:');
  console.log(item);
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
      thumb: item.thumb,
      description: item.description
    });
    console.log('newItemId: ' + newItem.id);
    newItem.setSeller(user);
    return newItem.id;
  }
  catch (e) {
    console.error('Error in service newItem:' + e.message);
  }
});

const createOrder = Promise.coroutine(
  function* (sellerId, buyerId, count, cost, items) {
    console.log('service: createOrder:');
    console.log(items);
    try {
      const seller = yield User.findOne({ where: { id: sellerId } });
      const buyer = yield User.findOne({ where: { id: buyerId } });
      if (!seller || !buyer) {
        throw new Error('User Not Found');
      }
      let newOrder = yield Order.create({
        count: count,
        totalCost: cost,
        status: 0
      });
      yield newOrder.setSeller(seller);
      yield newOrder.setBuyer(buyer);
      let newCost = 0;
      let newCount = 0;
      for (var i = 0; i < items.length; i++) {
        const element = items[i];
        const item = yield Item.findOne({ where: { id: element.itemId } });
        if (!item) {
          throw new Error('Item Not Found:' + element.itemId);
        }
        yield item.decrement('remain',{by: element.count});
        yield newOrder.addItem(item, {
          count: element.count,
          cost: item.price * element.count
        });
        newCost += item.price.toFixed(2) * element.count;
        newCount += element.count;
      }
      if (newCost.toFixed(2) != cost.toFixed(2)) {
        newOrder.destroy();
        throw new Error('price chaged.' + newCost + '::' + cost);
      }
      if (count != newCount) {
        newOrder.destroy();
        throw new Error('count dismatch!');
      }
    }
    catch (e) {
      console.error('Error in service newOrder:' + require('util').inspect(e));
    }
  }
);

const handleRefund = Promise.coroutine(function* (orderId, res, buyerRes, sellerRes) {
  console.log('service: handleRefund:');
  try {
    const order = yield Order.findOne({where: {id:orderId}});
    if(!order){
      throw new Error('Fatal error, from B5 or data failure');
    }
    yield order.update({
      buyerRes: buyerRes,
      sellerRes: sellerRes,
      status: 7
    });
    if(res){
      // TODO:
    }
    else{
      // TODO:
    }
  } catch (e) {
    console.error('Error in service handleRefund:' + require('util').inspect(e));
  }
});

module.exports = {
  createItem,
  createOrder
};
