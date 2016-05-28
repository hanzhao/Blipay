'use strict';

const Promise = require('bluebird');
const Item = require('../models').Item;
const Order = require('../models').Order;
const Attachment = require('../models').Attachment;
const ItemAttachment = require('../models').ItemAttachment;
const Review = require('../models').Review;

const Router = require('express').Router;
const router = Router();
const createItem = require('../services/order').createItem;
const getItem = require('../services/order').getItem;
const getItems = require('../services/order').getItems;
const createOrder = require('../services/order').createOrder;
const requestPay = require('../services/account').requestPay;
const requestReceive = require('../services/account').requestReceive;

router.post('/item/new', Promise.coroutine(function* (req, res) {
  console.log('in /item/new', req.body);
  const item = yield createItem(req.session.userId, req.body);
  const reviews = yield item.getReviews();
  return res.success({ id: item.id, reviews: reviews });
}));

router.get('/item/show', Promise.coroutine(function* (req, res) {
  console.log('in /item/show', req.query);
  const item = yield getItem(req.query.id);
  if (!item) {
    return res.status(404).fail()
  }
  return res.success({ item })
}));

const validate = (i) => {
  return typeof (i) != 'undefined';
};

router.get('/items', Promise.coroutine(function* (req, res) {
  const items = yield getItems()
  return res.success({ items });
}))

router.post('/item/item_list', Promise.coroutine(function* (req, res) {
  console.log('in /item/item_list');
  console.log(req.body);
  try {
    if (validate(req.body.id)) {
      const item = yield Item.findOne({
        where: { id: req.body.id }, order: req.body.base + req.body.order
      });
      return res.success({ items: [item] });
    }
    let filter = {};
    if (validate(req.body.sellerId)) {
      filter.sellerId = req.body.sellerId;
    } else {
      filter.sellerId = req.session.userId;
    }
    if (validate(req.body.filter)) {

      if (validate(req.body.filter.price)) {
        filter.price = req.body.filter.price;
      }
      if (validate(req.body.filter.time)) {
        filter.createdAt = req.body.filter.time;
      }
      if (validate(req.body.filter.remain)) {
        filter.remain = req.body.filter.remain;
      }
      if (validate(req.body.filter.name)) {
        filter.name = req.body.filter.name;
      }
    }
    return res.success({
      items: yield Item.findAll({
        where: filter,
        order: (req.body.base + req.body.order) || 'id DESC',
        offset: req.body.head || 0,
        limit: req.body.length || 1000,
        include: [{
          model: Attachment,
          through: ItemAttachment,
          attributes: ['id']
        }]
      })
    });
  }
  catch (e) {
    return res.fail('in /item/item_list   ' + e.message);
  }
}));

router.post('/item/update', Promise.coroutine(function* (req, res) {
  console.log('in /item/update');
  console.log(req.body);
  try {
    const item = yield Item.findOne({ where: { id: req.body.id } });
    if (!item) {
      return res.fail({ type: 'NO_ITEM' })
    }
    // TODO: check item owner and authentication
    if (item.sellerId != req.session.userId) {
      return res.fail({ type: 'AUTH_FAIL' })
    }
    yield item.update(req.body);
    return res.success('Item updated.');
  }
  catch (e) {
    return res.fail('in /item/update   ' + e.message);
  }
}));

router.post('/item/delete', Promise.coroutine(function* (req, res) {
  console.log('in /item/delete');
  console.log(req.body);
  try {
    const item = yield Item.findOne({ where: { id: req.body.id } });
    if (!item) {
      return res.fail({ type: 'NO_ITEM' })
    }
    // TODO: check item owner and authentication
    if (item.sellerId != req.session.userId) {
      throw new Error('Auth Fail.');
    }
    yield item.destroy();
    return res.success('Item destroyed');
  }
  catch (e) {
    return res.fail('in /item/delete   ' + e.message);
  }
}));

router.post('/order/new', Promise.coroutine(function* (req, res) {
  console.log('in /order/new');
  console.log(req.body);
  try {
    yield createOrder(req.session.userId, req.body.items);
    return res.success('Order created');
  }
  catch (e) {
    return res.fail('in /order/new   ' + e.message);
  }
}));

router.post('/order/delete', Promise.coroutine(function* (req, res) {
  console.log('/order/delete');
  console.log(req.body);
  try {
    const order = yield Order.findOne({ where: { id: req.body.orderId } });
    if (!order) {
      return res.fail({ type: 'NO_ORDER' })
    }
    // TODO: Use transaction

    yield order.destroy();
    return res.success('Order deleted');
  }
  catch (e) {
    return res.fail('in /order/delete   ' + e.message);
  }
}));

router.post('/order/update', Promise.coroutine(function* (req, res) {
  console.log('/order/update');
  console.log(req.body);
  try {
    const order = yield Order.findOne({ where: { id: req.body.orderId } });
    if (!order) {
      return res.fail({ type: 'NO_ORDER' });
    }
    switch (req.body.op) {
      case 'pay':
        if (order.status != 0) {
          return res.fail({ type: 'INVALID_OP' })
        }
        if (req.session.userId != order.buyerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        const payTrans = yield requestPay(order.buyerId, order.totalCost,
          `成功支付订单 #${order.id}`);
        yield order.update({
          buyerTransId: payTrans,
          status: 1
        });
        break;
      case 'ship':
        if (order.status != 1) {
          return res.fail({ type: 'INVALID_OP' })
        }
        // TODO:
        if (req.session.userId != order.sellerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        yield order.update({
          status: 2
        });
        break;
      case 'confirm':
        if (order.status != 2) {
          return res.fail({ type: 'INVALID_OP' })
        }
        // TODO:
        if (req.session.userId != order.buyerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        const items = yield order.getItems();
        for (var index = 0; index < items.length; index++) {
          yield items[index].addReview(
            yield Review.create({
              score: req.body.reviews[index].score,
              text: req.body.reviews[index].text,
              userId: req.session.userId
            })
          );
        };
        const confirmTrans = yield requestReceive(
          order.sellerId, order.totalCost,
          `获得订单 #${order.id} 的收益`
        );
        yield order.update({
          sellerTransId: confirmTrans,
          status: 3
        });
        break;
      case 'reqRefund':
        if (order.status != 2 && order.status != 3) {
          return res.fail({ type: 'INVALID_OP' })
        }
        // TODO:
        if (req.session.userId != order.buyerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        if (!validate(req.body.refundReason)) {
          throw new Error('Expect refundReason');
        }
        yield order.update({
          buyerText: req.body.refundReason,
          status: 4
        });
        break;
      case 'refuseRefund':
        if (order.status != 4) {
          return res.fail({ type: 'INVALID_OP' })
        }
        // TODO:
        if (!validate(req.body.refuseReason)) {
          throw new Error('Expect refuseReason');
        }
        yield order.update({
          sellerText: req.body.refuseReason,
          status: 6
        });
        // TODO: Call B5
        break;
      case 'confirmRefund':
        if (order.status != 4) {
          return res.fail({ type: 'INVALID_OP' })
        }
        // TODO:
        const refundTrans = requestReceive(order.buyerId, order.totalCost);
        yield order.update({
          status: 5,
          refundTransId: refundTrans
        });
        break;
      default:
        return res.fail({ type: 'INVALID_OP' })
    }
    return res.success(order);
  }
  catch (e) {
    return res.fail('in /order/update   ' + e.message);
  }
}));

router.post('/order/order_list', Promise.coroutine(function* (req, res) {
  console.log('/order/order_list');
  console.log(req.body);
  try {
    if (validate(req.body.id)) {
      const order = yield Order.findOne({ where: { id: req.body.id } });
      return res.success({ orders: [order] });
    }
    let filter = { $or: [] };
    if (validate(req.body.sellerId)) {
      filter.$or.push({ sellerId: req.session.userId });
    }
    if (validate(req.body.buyerId)) {
      filter.$or.push({ buyerId: req.session.userId });
    }
    if (validate(req.body.filter)) {
      if (validate(req.body.filter.time)) {
        filter.createdAt = req.base.filter.time;
      }
      if (validate(req.body.filter.status)) {
        filter.status = req.body.filter.status;
      }
    }
    let queryOrder = '';
    if (validate(req.body.base)) {
      queryOrder = req.body.base + ' ' + req.body.order;
    }
    const orders = yield Order.findAll({
      where: filter,
      order: queryOrder,
      offset: req.body.head,
      limit: req.body.length,
      include: [
        {
          model: Item
        }
      ]
    });

    return res.success({ orders: orders });
  }
  catch (e) {
    return res.fail('in /order/order_list   ' + require('util').inspect(e));
  }
}));

router.post('/item/review', Promise.coroutine(function* (req, res) {
  console.log('/item/review');
  console.log(req.body);
  try {
    const item = yield Item.findOne({ where: { id: req.body.itemId } });
    const reviews = yield item.getReviews();
    return res.success({ reviews: reviews });
  }
  catch (e) {
    return res.fail('in /item/review   ' + require('util').inspect(e));
  }
}));

module.exports = router
