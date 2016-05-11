const User = require('../../models').User;
const Promise = require('bluebird');

export const checkBalance = (userId) => {
  return new Promise((resolve, reject) => {
    User.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      if (!user) {
        throw new Error('userId is invalid.');
      }
      resolve(user.balance);
    }).catch((err) => {
      reject(err);
    });
  });
};

export const requestPay = (userId, amount) => {
  return new Promise((resolve, reject) => {
    if (isNaN(amount)) {
      reject(new Error('amount is invalid'));
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
          resolve(user.balance - amount);
        } else {
          reject(new Error('error updating database.'))
        }
      })
    }).catch((err) => {
      reject(err);
    });
  });
};

export const requestReceive = (userId, amount) => {
  return requestPay(userId, -amount);
}
