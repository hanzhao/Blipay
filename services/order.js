'use strict';
const Item = require('../models').Item;
const Attachment = require('../models').Attachment;
const ItemAttachment = require('../models').ItemAttachment;
const ItemSeller = require('../models').ItemSeller;
const User = require('../models').User;
const Order = require('../models').Order;

const createItem = Promise.coroutine(function* (sellerId, item) {
  const user = yield User.findOne({ where: { id: sellerId } });
  if (item.remain < 0) {
    throw new Error('INVALID_REMAIN');
  }
  if (item.price < 0) {
    throw new Error('INVALID_PRICE');
  }
  const newItem = yield Item.create({
    name: item.name,
    price: item.price,
    remain: item.remain,
    description: item.description,
    sellerId: sellerId
  });
  yield newItem.setAttachments(item.photo)
  return newItem;
});

const getItem = Promise.coroutine(function* (itemId) {
  const item = yield Item.findById(itemId, {
    attributes: ['name', 'description', 'price', 'remain'],
    include: [{
      model: User,
      as: 'seller',
      attributes: ['id', 'realName']
    }, {
      model: Attachment,
      through: ItemAttachment,
      attributes: ['id']
    }]
  })
  return item
})

const getItems = Promise.coroutine(function* () {
  const items = yield Item.findAll({
    where: { remain: { $gt: 0 } },
    attributes: ['id', 'name', 'price', 'remain'],
    include: [{
      model: User,
      as: 'seller',
      attributes: ['id', 'realName']
    }, {
      model: Attachment,
      through: ItemAttachment,
      attributes: ['id']
    }]
  })
  return items;
})

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
      // if (newCost.toFixed(2) != cost.toFixed(2)) {
      //   newOrder.destroy();
      //   throw new Error('price chaged.' + newCost + '::' + cost);
      // }
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
  createOrder,
  getItem,
  getItems
};
