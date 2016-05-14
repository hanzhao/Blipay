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
      const newItem = yield Item.create({
        name: req.body.name,
        price: req.body.price,
        remain: req.body.remain,
        thumb: req.body.thumb
      });
      yield newItem.setSeller(user);
      return res.json({
        code: 0
      });
    }
    catch (e) {
      console.error('in /item/new: \t' + e.message);
      return res.json({
        code: -1
      });
    }
  })();
});

module.exports = router
