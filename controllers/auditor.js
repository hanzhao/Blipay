'use strict';
const _ = require('lodash');
const db = require('../models').db;
const User = require('../models').Admin;
const Users = require('../models').User;
const Transaction = require('../models').Transaction;
const Record = require('../models').Record;
const Logtable = require('../models').Logtable;
const Order = require('../models').Order;
const config = require('../config/admin');
const Router = require('express').Router;
const crypto = require('crypto');
const router = Router();
const Util = require('util');
const multer = require('multer');
const fs = Promise.promisifyAll(require('fs'));
const uploadPath = require('../config').upload;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.mailConfig);

router.post('/auditor/check_recordid', Promise.coroutine(function* (req, res) {
  console.log('in check_recordid', req.body);
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const record = yield Record.findById(parseInt(req.body.id), {
    attributes: ['id']
  })
  if (parseInt(req.body.id) === record.id) {
    return res.success();
  } else {
    return res.fail({ type: 'WRONG_PAYPASS' });
  }
}));

const cookPassword = (key, salt) => {
  var hash = crypto.createHash('sha512');
  const mid = key.length >> 1
  return hash.update(key.slice(0, mid))
    .update(salt)
    .update(key.slice(mid))
    .digest('base64');
};

const reportError = (path, err) => {
  console.error(
    `\nERROR occurs in ${path}:\n\n${Util.inspect(err)}\n`
  );
};

router.post('/auditor/login', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/login', req.body);
  let user = yield User.findOne({
    where: {
      adminName: req.body.userName,
      level: 2 },
    attributes: ['id', 'loginPass', 'salt']
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
  /*user.lastLogin = new Date().toString()
  yield user.save()*/
  // 删除密码字段
  delete user.salt
  delete user.loginPass
  // 登录信息
  req.session.auditorId = user.id
  return res.success({ user });
}));

router.get('/auditor/logout', (req, res) => {
  console.log('in /auditor/logout');
  req.session.auditorId = null;
  return res.success({});
});

router.get('/auditor/info', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/info');
  if (!req.session.auditorId) {
    return res.success({ })
  }
  const user = yield User.findById(req.session.auditorId, {
    attributes: ['adminName', 'id']
  })
  return res.success({ user })
}));

router.post('/auditor/addinfo', Promise.coroutine(function* (req, res) {
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  yield Record.update({
    info: req.body.info
  }, {
    where: { id: parseInt(req.body.id) }
  });
  const record = yield Record.findById(parseInt(req.body.id));
  if (record.wrongStatus > 0) {
    yield Logtable.update({
    info: req.body.info
    }, {
      where: { orderId: record.orderId}
    });
  }
  const transaction = yield Record.findAll();
  return res.success({record,transaction});
}));

router.post('/auditor/searchorder', Promise.coroutine(function* (req, res) {
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const transaction = yield Record.findAll({
    where: {
      orderId: req.body.key
    },
    order: ['id']
  });
  return res.success({transaction});
}));

router.post('/auditor/searchbuyer', Promise.coroutine(function* (req, res) {
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const transaction = yield Record.findAll({
    where: {
      buyerId: req.body.key
    },
    order: ['id']
  });
  return res.success({transaction});
}));

router.post('/auditor/searchseller', Promise.coroutine(function* (req, res) {
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const transaction = yield Record.findAll({
    where: {
      sellerId: req.body.key
    },
    order: ['id']
  });
  return res.success({transaction});
}));

router.get('/auditor/transactions', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/transactions');
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const transactions = yield Record.findAll({
    order: ['id']
  });
  return res.success({ transactions })
}));

router.get('/auditor/log', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/log');
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const logtable = yield Logtable.findAll({
    order: ['id']
  });
  return res.success({ logtable })
}));

router.get('/auditor/user', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/user');
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const loguser = yield Users.findAll({
    where:{
      balance: {'$lt': 0}
    }
  });
  return res.success({ loguser })
}));

router.get('/auditor/insert', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/insert');
  if (!req.session.auditorId) {
    return res.status(403).fail()
  }
  const today = new Date();
  const order = yield Order.findAll({
    where:{
      status: 3,
      updatedAt: {'$between': [`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
        `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`]}
    }
  });
  for (let i = 0; i < order.length; ++i) {
    const cnt = yield Record.count({ where: { orderId: order[i].id } })
    if (cnt > 0) { continue }
    const buy = yield Transaction.findById(order[i].buyerTransId);
    const sell = yield Transaction.findById(order[i].sellerTransId);
    let k = 0;
    if (order[i].totalCost >= 500) {
      k = 2;
    }
    if (order[i].status === 3) {
      if (-buy.amount === sell.amount && sell.amount === order[i].totalCost ){
        if (order[i].totalCost === 0 || order[i].totalCost >= 500) {
          k = 2;
        } else {
          k = 0;
        }
      } else {
        k = 1;
      }
    }
    const newRecord = {
      buyerId: order[i].buyerId,
      sellerId: order[i].sellerId,
      totalCost: order[i].totalCost,
      buyerPay: buy.amount,
      sellerGet: sell.amount,
      status: order[i].status,
      orderId: order[i].id,
      wrongStatus: k
    };
    const record = yield Record.create(newRecord);
  }

  const transaction = yield Record.findAll({
    order: ['id']
  });

  const record = yield Record.findAll({
    where:{
      wrongStatus: {'$gt': 0},
      updatedAt: {'$between': [`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
        `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`]}
    }
  });
  for (let i = 0; i < record.length; ++i) {
    const cnt = yield Logtable.count({ where: { orderId: order[i].id } })
    if (cnt > 0) { continue }
    const newLogtable = {
      buyerId: record[i].buyerId,
      sellerId: record[i].sellerId,
      totalCost: record[i].totalCost,
      buyerPay: record[i].buyerPay,
      sellerGet: record[i].sellerGet,
      status: record[i].status,
      orderId: record[i].orderId,
      wrongStatus: record[i].wrongStatus
    };
    const logtable = yield Logtable.create(newLogtable)
  }

  return res.success({ transaction });
}));

module.exports = router;
