/** 用户模块内部接口 */
const User = require('../models').User;
const db = require('../models').db;
const Transaction = require('../models').Transaction;
const Promise = require('bluebird');
const crypto = require('crypto');

/** 密码加密 */
const cookPassword = (key, salt) => {
  var hash = crypto.createHash('sha512');
  const mid = key.length >> 1;
  return hash.update(key.slice(0, mid))
    .update(salt)
    .update(key.slice(mid))
    .digest('base64');
};

/** 返回用户余额 */
const checkBalance = Promise.coroutine(function *(userId) {
  const user = yield User.findById(userId);
  if (!user) {
    throw new Error('INVALID_USERID');
  }
  return user.balance;
});

/** 请求扣款 */
const requestPay = Promise.coroutine(function *(userId, amount, info, canBelowZero) {
  if (isNaN(amount)) {
    throw new Error('INVALID_AMOUNT');
  }
  const user = yield User.findById(userId, {
    attributes: [ 'balance' ]
  });
  if (!user) {
    throw new Error('INVALID_USERID');
  }
  if (user.balance < amount && !canBelowZero) {
    throw new Error('INSUFFICIENT_AMOUNT');
  }
  const newTransaction = {
    userId: userId,
    amount: -amount,
    type: 3,
    status: 1,
    info: info || `支出 ${amount} 元`
  };
  const transaction = yield Transaction.create(newTransaction);
  yield User.update({
    balance: db.literal(`balance - ${amount}`)
  }, {
    where: { id: userId }
  });
  return transaction.id;
});

/** 请求收款 */
const requestReceive = Promise.coroutine(function *(userId, amount, info) {
  if (isNaN(amount)) {
    throw new Error('INVALID_AMOUNT');
  }
  const user = yield User.findById(userId);
  if (!user) {
    throw new Error('INVALID_USERID');
  }
  const newTransaction = {
    userId: userId,
    amount: amount,
    type: 4,
    status: 1,
    info: info || `收入 ${amount} 元`
  };
  const transaction = yield Transaction.create(newTransaction);
  yield User.update({
    balance: db.literal(`balance + ${amount}`)
  }, {
    where: { id: userId }
  });
  return transaction.id;
});

/** 支付密码检查 */
const checkPaypass = Promise.coroutine(function *(userId, payPass) {
  const user = yield User.findById(userId, {
    attributes: ['payPass', 'salt']
  });
  if (!user) {
    throw new Error('INVALID_USERID');
  }
  if (cookPassword(payPass, user.salt) == user.payPass) {
    return 0;
  } else {
    throw new Error('INCORRECT_PAYPASS');
  }
});

module.exports = {
  checkBalance,
  requestPay,
  requestReceive,
  checkPaypass,
  cookPassword
};
