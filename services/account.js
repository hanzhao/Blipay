const User = require('../models').User;
const Transaction = require('../models').Transaction;
const Promise = require('bluebird');
// const config = require('../../config/account');
const crypto = require('crypto');

const cookPassword = (key, salt, saltPos) => {
  var hash = crypto.createHash('sha512');
  return hash.update(key.slice(0, saltPos))
    .update(salt)
    .update(key.slice(saltPos))
    .digest('base64');
};

const checkBalance = (userId) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      if (!user) {
        throw new Error('userId is invalid.');
      }
      return resolve(user.balance);
    }).catch((err) => {
      return reject(err);
    });
  });
};

const requestPay = (userId, amount) => {
  return new Promise((resolve, reject) => {
    if (isNaN(amount)) {
      return reject(new Error('amount is invalid'));
    }
    User.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      if (!user) {
        throw new Error('userId is invalid.');
      }
      if (user.balance < amount) {
        throw new Error('balance is not enough.');
      }
      const newTransaction = {
        userId: user.id,
        amount: amount,
        type: 3,
        status: 1
      };
      Transaction.create(newTransaction)
      .then(() => {
        User.update({
          balance: user.balance - amount
        }, {
          where: {
            id: userId
          }
        }).then((res) => {
          if(res) {
            return resolve(user.balance - amount);
          } else {
            return reject(new Error('error updating database.'));
          }
        });
      });
    }).catch((err) => {
      return reject(err);
    });
  });
};

const requestReceive = (userId, amount) => {
  return new Promise((resolve, reject) => {
    if (isNaN(amount)) {
      return reject(new Error('amount is invalid'));
    }
    User.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      if (!user) {
        throw new Error('userId is invalid.');
      }
      const newTransaction = {
        userId: user.id,
        amount: amount,
        type: 4,
        status: 1
      };
      Transaction.create(newTransaction)
      .then(() => {
        User.update({
          balance: user.balance + amount
        }, {
          where: {
            id: userId
          }
        }).then((res) => {
          if(res) {
            return resolve(user.balance + amount);
          } else {
            return reject(new Error('error updating database.'));
          }
        });
      });
    }).catch((err) => {
      return reject(err);
    });
  });
};

const checkPaypass = (userId, payPass) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      if (!user) {
        throw new Error('userId is invalid.');
      }
      if (cookPassword(
            payPass,
            user.paySalt,
            config.paySaltPos)  === user.payPass) {
        return resolve(0);
      }
      reject(new Error('payPass wrong.'));
    }).catch((err) => {
      return reject(err);
    });
  });
};

const login = (userName, loginPass) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        userName: userName
      }
    }).then((user) => {
      if (!user) {
        throw new Error('userName does not exist.');
      }
      if (cookPassword(
            loginPass,
            user.loginSalt,
            config.loginSaltPos)  === user.loginPass) {
        return resolve(user.id);
      }
      reject(new Error('loginPass wrong.'));
    }).catch((err) => {
      return reject(err);
    });
  });
};

module.exports = {
  checkBalance,
  requestPay,
  requestReceive,
  checkPaypass,
  login
};
