'use strict';
const _ = require('lodash');
const db = require('../models').db;
const User = require('../models').Admin;
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
  if (!req.session.userId) {
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

router.post('/auditor/withdraw', Promise.coroutine(function* (req, res) {
  if (!req.session.userId) {
    return res.status(403).fail()
  }
  yield Record.update({
    info: req.body.info
  }, {
    where: { id: parseInt(req.body.id)}
  });
  const transaction = yield Record.findById(parseInt(req.body.id));
  if(transaction.wrongStatus>0){
    yield Logtable.update({
    info: req.body.info
    }, {
      where: { orderId: transaction.orderId}
    });
  }
  return res.success({transaction});
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
  req.session.userId = user.id 
  return res.success({ user });
}));

router.get('/auditor/logout', (req, res) => {
  console.log('in /auditor/logout');
  req.session.userId = null;
  return res.success({});
});

router.get('/auditor/info', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/info');
  if (!req.session.userId) {
    return res.success({ })
  }
  const user = yield User.findById(req.session.userId, {
    attributes: ['adminName', 'id']
  })
  return res.success({ user })
}));

router.get('/auditor/transactions', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/transactions');
  if (!req.session.userId) {
    return res.status(403).fail()
  }
  const transactions = yield Record.findAll({
    order: ['id']
  });
  return res.success({ transactions })
}));

router.get('/auditor/log', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/log');
  if (!req.session.userId) {
    return res.status(403).fail()
  }

  const logtable = yield Logtable.findAll({
    order: ['id']
  });
  return res.success({ logtable })
}));

router.get('/auditor/insert', Promise.coroutine(function* (req, res) {
  console.log('in /auditor/insert');
  if (!req.session.userId) {
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
 const count = yield Order.count({
    where:{
      status: 3,
      updatedAt: {'$between': [`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`, 
        `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`]}
    }
   });
 for(var i=0;i<count;i++)
 {
    const buy = yield Transaction.findById(order[i].buyerTransId);
    const sell = yield Transaction.findById(order[i].sellerTransId);
    var k=0;
    if(order[i].totalCost>=500)
      k=2;
    if(order[i].status===3){
      if(-buy.amount===sell.amount && sell.amount===order[i].totalCost){
        if(order[i].totalCost===0 || order[i].totalCost>=500){
          k=2;
        }
        else{
          k=0;
        }   
      }
      else {
        k=1;
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
  };
    

  const count1 = yield Record.count({
    where:{
      wrongStatus: {'$gt': 0},
      updatedAt: {'$between': [`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`, 
        `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`]}
    }
   });
  const record = yield Record.findAll({
    where:{
      wrongStatus: {'$gt': 0},
      updatedAt: {'$between': [`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`, 
        `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`]}
    }
   });
   for(var i=0;i<count1;i++)
   {
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
  };

  return res.success({ })
}));

module.exports = router;
