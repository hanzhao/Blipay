'use strict';
const Item = require('../models').Item;
const Attachment = require('../models').Attachment;
const ItemAttachment = require('../models').ItemAttachment;
const ItemSeller = require('../models').ItemSeller;
const User = require('../models').User;
const Order = require('../models').Order;
const Review = require('../models').Review;

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
    attributes: ['id', 'name', 'description', 'price', 'remain'],
    include: [{
      model: User,
      as: 'seller',
      attributes: ['id', 'realName']
    }, {
      model: Attachment,
      through: ItemAttachment,
      attributes: ['id']
    },{
      model: Review,
      include: [{
        model: User
      }]
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

const createOrder = Promise.coroutine(function* (buyerId, items) {
  console.log('service: createOrder:', items);
  try {
    items = yield Promise.all(items.map(Promise.coroutine(function* (e) {
      return {
        e: yield Item.findById(e.id),
        amount: e.amount
      }
    })))
    console.log(items)
    const seller = yield User.findOne({ where: { id: items[0].e.sellerId } });
    const buyer = yield User.findOne({ where: { id: buyerId } });
    if (!seller || !buyer) {
      throw new Error('User Not Found');
    }
    let count = 0, cost = 0
    items.forEach(e => {
      count += e.amount
      cost += e.amount * e.e.price
    })
    let newOrder = yield Order.create({
      count: count,
      totalCost: cost,
      status: 0
    });
    yield newOrder.setSeller(seller);
    yield newOrder.setBuyer(buyer);
    for (var i = 0; i < items.length; ++i) {
      const item = items[i];
      yield item.e.decrement('remain',{ by: item.amount });
      yield newOrder.addItem(item.e, {
        count: item.amount,
        cost: item.e.price * item.amount
      });
    }
  }
  catch (e) {
    console.error(e.stack)
    console.error('Error in service newOrder:' + require('util').inspect(e));
  }
});

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
