'use strict';

const Promise = require('bluebird');
const Item = require('../models').Item;
const Router = require('express').Router;
const router = Router();
const createItem = require('./services/order').createItem;
const createOrder = require('./services/order').createOrder;

router.post('/item/new', Promise.coroutine(function* (req, res) {
  console.log('in /item/new');
  console.log(req.body);
  try {
    // TODO: Fetch user from session
    createItem(1, req.body);
    return res.json({ code: 0 });
  }
  catch (e) {
    console.error('error in /item/new: \t' + e.message);
    return res.json({
      code: 1,
      error: 'Error inserting new item:' + e.message
    });
  }
}));

const validate = (i) => {
  return typeof (i) != 'undefined';
};

router.post('/item/item_list', Promise.coroutine(function* (req, res) {
  console.log('in /item/item_list');
  console.log(req.body);
  try {
    if (validate(req.body.id)) {
      const item = yield Item.findOne({
        where: { id: req.body.id }, order: req.body.base + req.body.order
      });
      return res.json({ items: [item] });
    }
    let filter = {};
    if (validate(req.body.sellerId)) {
      filter.sellerId = req.body.sellerId;
    }
    if (validate(req.body.filter.price)) {
      filter.price = req.body.filter.price;
    }
    if (validate(req.body.filter.time)) {
      filter.createdAt = req.body.filter.time;
    }
    if (validate(req.body.filter.remain)) {
      filter.remain = req.body.filter.remain;
    }
    return res.json({
      items: yield Item.findAll({
        where: filter,
        order: req.body.base + req.body.order,
        offset: req.body.head,
        limit: req.body.length
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
    const item = yield  Item.findOne({ where: { id: req.body.id } });
    // TODO: check item owner and authentication 
    if (!item) {
      throw new Error('Item Not Found.');
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
    // TODO: check item owner and authentication 
    if (!item) {
      throw new Error('Item Not Found.');
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
    createOrder(req.body.sellerId, req.body.buyerId, req.body.count, req.body.cost, req.body.items);
    return res.success('Order created');
  }
  catch (e) {
    return res.fail('in /order/new   ' + e.message);
  }
}));

module.exports = router
