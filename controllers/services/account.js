const User = require('../../models').User;
const Promise = require('bluebird');

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
    }).catch((err) => {
      return reject(err);
    });
  });
};

const requestReceive = (userId, amount) => {
  return requestPay(userId, -amount);
};

module.exports = {
  checkBalance,
  requestPay,
  requestReceive
};
