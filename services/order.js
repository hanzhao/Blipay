/** 订单内部接口 */
'use strict';
const Item = require('../models').Item;
const Attachment = require('../models').Attachment;
const ItemAttachment = require('../models').ItemAttachment;
const User = require('../models').User;
const Order = require('../models').Order;
const Review = require('../models').Review;

/** 调用用户接口 */
const requestPay = require('../services/account').requestPay;
const requestReceive = require('../services/account').requestReceive;

/** 生成新商品 */
const createItem = Promise.coroutine(function* (sellerId, item) {
  if (item.remain < 0) {
    throw new Error('INVALID_REMAIN');
  }
  if (item.price < 0) {
    throw new Error('INVALID_PRICE');
  }
  // TODO
  const newItem = yield Item.create({
    name: item.name,
    price: item.price,
    remain: item.remain,
    description: item.description,
    sellerId: sellerId
  });
  yield newItem.setAttachments(item.photo);
  return newItem;
});

/** 获取商品信息 */
const getItem = Promise.coroutine(function* (itemId) {
  const item = yield Item.findById(itemId, {
    attributes: ['id', 'name', 'description', 'price', 'remain'],
    include: [
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'realName']
      }, {
        model: Attachment,
        through: ItemAttachment,
        attributes: ['id']
      }, {
        model: Review,
        include: [
          {
            model: User
          }]
      }
    ]
  })
  return item
})

/** 获取所有有余量商品 */
const getItems = Promise.coroutine(function* () {
  const items = yield Item.findAll({
    where: { remain: { $gt: 0 } },
    attributes: ['id', 'name', 'price', 'remain'],
    include: [
      {
        model: User,
        as: 'seller',
        attributes: ['id', 'realName']
      }, {
        model: Attachment,
        through: ItemAttachment,
        attributes: ['id']
      }
    ]
  })
  return items;
})

/** 创建订单 */
const createOrder = Promise.coroutine(function* (buyerId, items, addr) {
  console.log('service: createOrder:', items);
  try {
    /** 订单中商品 */
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
    /** 计算价格 */
    items.forEach(e => {
      count += e.amount
      cost += e.amount * e.e.price
    })
    let newOrder = yield Order.create({
      count: count,
      totalCost: cost,
      status: 0,
      addr: addr
    });
    yield newOrder.setSeller(seller);
    yield newOrder.setBuyer(buyer);
    /** 减少商品余量 */
    for (var i = 0; i < items.length; ++i) {
      const item = items[i];
      yield item.e.decrement('remain', { by: item.amount });
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

/** 仲裁回调结果 */
const handleRefund = Promise.coroutine(
  function* (orderId, res, buyerRes, sellerRes) {
    console.log('service: handleRefund:');
    try {
      const order = yield Order.findOne({ where: { id: orderId } });
      if (!order) {
        throw new Error('Fatal error, from B5 or data failure');
      }
      if (res) {// 退款
        /** 仲裁退款 */
        const sellerRefund = yield requestPay(order.sellerId, order.totalCost, `订单 #${order.id} 退款`, true)
        const refundTrans = yield requestReceive(order.buyerId, order.totalCost, `订单 #${order.id} 退款`);
        yield order.update({
          status: 7,
          refundTransId: refundTrans,
          sellerRefundTransId: sellerRefund
        });
      }
      else {
        /** 结束仲裁 */
        yield order.update({
          status: 8
        });
      }
    } catch (e) {
      console.error('Error in service handleRefund:' + e.message);
    }
  });

module.exports = {
  createItem,
  createOrder,
  getItem,
  getItems,
  handleRefund
};
