'use strict'

const Promise = require('bluebird');
const Item = require('../models').Item;
const User = require('../models').User;
const Router = require('express').Router;
const router = Router();

router.post('/item/new', (req, res) => {
  console.log('in /item/new');
  console.log(req.body);
  Promise.coroutine(function* () {
    try {
      // TODO: Fetch user from session
      // const user = yield User.findOne({ where: { id: req.session.userId } });
      const user = yield User.findOne({ where: { id: 1 } });
      console.log("debug");
      if (req.body.remain < 0 || req.body.price < 0) {
        throw new Error("illegal parameter.");
      }
      const newItem = yield Item.create({
        name: req.body.name,
        price: req.body.price,
        remain: req.body.remain,
        thumb: req.body.thumb
      });
      yield newItem.setSeller(user);
      return res.json({ code: 0 });
    }
    catch (e) {
      console.error('error in /item/new: \t' + e.message);
      return res.json({code: 1, error: "Error inserting new item:"+e.message});
    }
  })();
});

const validate = (i) => {
  return typeof (i) != "undefined";
}

router.post('/item/item_list', (req, res) => {
  console.log('in /item/item_list');
  console.log(req.body);
  const body = req.body;
  const order = [body.base, body.order];
  Promise.coroutine(function* () {
    try {
      if (validate(body.id)) {
        return res.json({ items: [yield Item.findOne({ where: { id: body.id }, order: order })] });
      }
      const filter = {};
      if (validate(body.filter.price)) {
        filter.price = body.filter.price;
      }
      if (validate(body.filter.time)) {
        filter.createAt = body.filter.time;
      }
      if (validate(body.filter.remain)) {
        filter.remain = body.filter.remain;
      }
      return res.json({
        items: yield Item.findAll({
          where: filter,
          order: order
        })
      });
    }
    catch (e) {
      return res.fail('in /item/item_list\t' + e.message);
    }
  })();
});

module.exports = router
