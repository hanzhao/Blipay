'use strict';
const _ = require('lodash');
const db = require('../models').db;
const User = require('../models').User;
const Transaction = require('../models').Transaction;
const config = require('../config/auditor');
const Router = require('express').Router;
const crypto = require('crypto');
const router = Router();
const Util = require('util');
const multer = require('multer');
const fs = Promise.promisifyAll(require('fs'));
const uploadPath = require('../config').upload;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.mailConfig);



const cookPassword = (key, salt) => {
  var hash = crypto.createHash('sha512');
  const mid = key.length >> 1
  return hash.update(key.slice(0, mid))
    .update(salt)
    .update(key.slice(mid))
    .digest('base64');
};





router.post('/auditor/login', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/login', req.body);
  let user = yield User.findOne({
    where: { userName: req.body.userName },
    attributes: ['id', 'loginPass', 'salt', 'lastLogin']
  });
  if (!user) {
    return res.fail({ type: 'USER_NOT_EXIST' });
  }
  const password = cookPassword(req.body.loginPass,
                                user.salt)
  // 密码错误
  if (password !== user.loginPass)
    return res.fail({ type: 'INVALID_USERNAME_OR_PASSWORD' });
  // 更新最后登录时间
  user.lastLogin = new Date().toString()
  yield user.save()
  // 删除密码字段
  delete user.salt
  delete user.loginPass
  // 登录信息
  req.session.userId = user.id
  return res.success({ user });
}));

router.get('/auditor/logout', (req, res) => {
  console.log('in /auditor/logout');
  req.session.userId = null;
  return res.success({});
});



router.get('/auditor/transactions', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/transactions');
  if (!req.session.userId) {
    return res.status(403).fail()
  }
  const user = yield User.findById(req.session.userId)
  const transactions = yield user.getTransactions({
    order: ['id']
  });
  return res.success({ transactions })
}));



module.exports = router;
