const User = require('../models').User;
const Transaction = require('../models').Transaction;
const config = require('../config/account');
const Router = require('express').Router;
const crypto = require('crypto');
const router = Router();
const Promise = require('bluebird');
const Sequelize = require('sequelize');

const cookPassword = (key, salt, saltPos) => {
  var hash = crypto.createHash('sha512');
  return hash.update(key.slice(0, saltPos))
    .update(salt)
    .update(key.slice(saltPos))
    .digest('base64');
};

router.post('/account/register', (req, res) => {
  console.log('in /account/register');
  console.log(req.body);
  User.findOne({
    where: {
      userName: req.body.userName
    }
  })
  .then((user) => {
    if (user) {
      return res.fail({
        code: -1
      });
    }
    const loginSalt = crypto.randomBytes(64).toString('base64');
    const paySalt = crypto.randomBytes(64).toString('base64');
    const newUser = {
      userName: req.body.userName,
      loginSalt: loginSalt,
      loginPass: cookPassword(req.body.loginPass, 
                              loginSalt, 
                              config.loginSaltPos),
      paySalt: paySalt,
      payPass: cookPassword(req.body.payPass, 
                            paySalt, 
                            config.paySaltPos)
    };
    User.create(newUser)
      .then((user) => {
        return res.success({
          code: 0,
          userId: user.id,
          userName: user.userName
        });
      });
  })
  .catch((err) => {
    console.error('Error occurs in /account/register with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.get('/account/get_recent_transaction', Promise.coroutine(function *(req, res) {
  try {
    const transactions = yield Transaction.findAll({ 
                                   where: {userId: req.query.userId},
                                   order: ['createdAt'],
                                   limit: 10
                                 });
    return res.success({
      code: 0,
      transactions: transactions
    });
  } catch (e) {
    console.error(e.message);
    return res.fail({code: -2});
  }
}));

router.post('/account/login', Promise.coroutine(function *(req, res) {
  console.log('in /account/login');
  console.log(req.body);
  try {
    const user = yield User.findOne({where: {userName: req.body.userName}});
    if (!user) {
      return res.fail({code: -1});
    }
    if (cookPassword(
          req.body.loginPass, 
          user.loginSalt, 
          config.loginSaltPos
        ) === user.loginPass) {
      yield User.update({lastLogin: Date().toString()}, {where: {id: user.id}});
      const transactions = yield Transaction.findAll({ 
                                   where: {userId: user.id},
                                   order: ['createdAt'],
                                   limit: 10
                                 });
      return res.success({
        code: 0,
        userId: user.id,
        userName: user.userName,
        balance: user.balance,
        lastLogin: (new Date(user.lastLogin)).toLocaleString(),
        email: user.email,
        phone: user.phone,
        realName: user.realName,
        idNumber: user.idNumber,
        transactions: transactions
      });
    } else {
      return res.fail({code: -3});
    }
  } catch (e) {
    console.error(e.message)
    return res.fail({code: -2});
  }
}));
/*
router.post('/account/login', (req, res) => {
  console.log('in /account/login');
  console.log(req.body);
  User.findOne({
    where: {
      userName: req.body.userName
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    if (cookPassword(
          req.body.loginPass, 
          user.loginSalt, 
          config.loginSaltPos)  === user.loginPass) {
      return res.success({
        code: 0,
        userId: user.id,
        userName: user.userName,
        balance: user.balance,
        lastLogin: user.updatedAt
      });
    } else {
      res.fail({
        code: -3
      });
    }
  })
  .catch((err) => {
    console.error('Error occurs in /account/login with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});
*/

router.get('/account/check_paypass', (req, res) => {
  console.log('in check_paypass');
  console.log(req.query);
  User.findOne({
    where: {
      id: req.query.userId
    }
  }).then((user) => {
    if (!user) {
      console.log('check_paypass: userName not exists');
      return res.fail({
        code: -1
      });
    }
    if (cookPassword(
          req.query.payPass, 
          user.paySalt, 
          config.paySaltPos)  === user.payPass) {
      return res.success({
        code: 0
      });
    } else {
      console.log('check_paypass: payPass wrong');
      return res.fail({
        code: -3
      });
    }
  }).catch((err) => {
    console.error('check_paypass: fail\n' + err.message);
    return res.fail({
      code: -2
    });
  });
});

router.get('/account/check_loginpass', (req, res) => {
  console.log('in check_loginpass');
  console.log(req.query);
  User.findOne({
    where: {
      id: req.query.userId
    }
  }).then((user) => {
    if (!user) {
      console.log('check_loginpass: userId not exists');
      return res.fail({
        code: -1
      });
    }
    if (cookPassword(
          req.query.loginPass, 
          user.loginSalt, 
          config.loginSaltPos)  === user.loginPass) {
      return res.success({
        code: 0
      });
    } else {
      console.log('check_paypass: loginPass wrong');
      return res.fail({
        code: -3
      });
    }
  }).catch((err) => {
    console.error('check_loginpass: fail\n' + err.message);
    return res.fail({
      code: -2
    });
  });
});

router.get('/account/check_username', (req, res) => {
  console.log('in check_username');
  console.log(req.query);
  User.findOne({
    where: {
      userName: req.query.userName
    }
  }).then((user) => {
    if (!user) {
      console.log('check_username: not exists');
      return res.success({
        code: 0
      });
    } else {
      console.log('check_username: user exists');
      return res.fail({
        code: -1
      });
    }
  }).catch((err) => {
    console.error('check_username: fail\n' + err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/logout', (req, res) => {
  console.log('in logout');
  if(req.session.userId) {
    delete req.session.userId;
    return res.success({});
  } else {
    return res.fail({});
  }
});

router.post('/account/change_userName', (req, res) => {
  console.log('in /account/change_userName');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    User.update({
      userName: req.body.userName
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      return res.success({
        code: 0
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/change_userName with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/change_realName', (req, res) => {
  console.log('in /account/change_realName');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    User.update({
      realName: req.body.realName
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      return res.success({
        code: 0
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/change_realName with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/change_idNumber', (req, res) => {
  console.log('in /account/change_idNumber');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    User.update({
      idNumber: req.body.idNumber
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      return res.success({
        code: 0
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/change_idNumber with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/change_email', (req, res) => {
  console.log('in /account/change_email');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    User.update({
      email: req.body.email
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      return res.success({
        code: 0
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/change_email with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/change_phone', (req, res) => {
  console.log('in /account/change_phone');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    User.update({
      phone: req.body.phone
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      return res.success({
        code: 0
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/change_phone with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.get('/account/get_userinfo', (req, res) => {
  console.log('in /account/get_userinfo');
  console.log(req.query);
  User.findOne({
    where: {
      id: req.query.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    } else {
      return res.success({
        code: 0,
        userId: user.id,
        userName: user.userName,
        realName: user.realName,
        idNumber: user.idNumber, 
        email: user.email, 
        phone: user.phone
      })
    }
  })
  .catch((err) => {
    console.error('Error occurs in /accountn/get_userinfo with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/change_paypass', (req, res) => {
  console.log('in /account/change_paypass');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    User.update({
      payPass: cookPassword(req.body.payPass, 
                            user.paySalt, 
                            config.paySaltPos)
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      return res.success({
        code: 0
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/change_paypass with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/change_loginpass', (req, res) => {
  console.log('in /account/change_loginpass');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    User.update({
      loginPass: cookPassword(req.body.loginPass, 
                              user.loginSalt, 
                              config.loginSaltPos)
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      return res.success({
        code: 0
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/change_loginpass with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.get('/account/get_balance', (req, res) => {
  console.log('in /account/get_balance');
  console.log(req.query);
  User.findOne({
    where: {
      id: req.query.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    } else {
      return res.success({
        code: 0,
        balance: user.balance
      })
    }
  })
  .catch((err) => {
    console.error('Error occurs in /account/get_balance with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/charge', (req, res) => {
  console.log('in /account/charge');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    if (true){
      const newBalance = user.balance + req.body.amount;
      User.update({
        balance: newBalance
      }, {
        where: {
          id: req.body.userId
        }
      })
      .then(() => {
        const newTransaction = {
          userId: user.id,
          amount: req.body.amount,
          type: 1,
          status: 1
        }
        Transaction.create(newTransaction)
        .then(() => {
          return res.success({
            code: 0,
            balance: newBalance
          });
        })
      })
    }
    /*
    else {
      const newTransaction = {
        userId: user.id,
        amount: req.body.amount,
        type: 1,
        status: 0
      }
      Transaction.create(newTransaction)
      .then(() => {
        return res.fail({
          code: -3
        });
      })
    }*/
  })
  .catch((err) => {
    console.error('Error occurs in /account/charge with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/account/withdraw', (req, res) => {
  console.log('in /account/withdraw');
  console.log(req.body);
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    }
    if (user.balance < req.body.amount){
      const newTransaction = {
        userId: user.id,
        amount: req.body.amount,
        type: 2,
        status: 0
      }
      Transaction.create(newTransaction);
      return res.fail({
        code: -3
      });
    }
    const newBalance = user.balance - req.body.amount;
    User.update({
      balance: newBalance
    }, {
      where: {
        id: req.body.userId
      }
    })
    .then(() => {
      const newTransaction = {
        userId: user.id,
        amount: req.body.amount,
        type: 2,
        status: 1
      }
      Transaction.create(newTransaction)
      .then(() => {
        return res.success({
          code: 0,
          balance: newBalance
        });
      });
    });
  })
  .catch((err) => {
    console.error('Error occurs in /account/withdraw with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.get('/account/get_transaction', (req, res) => {
  console.log('in /account/get_transaction');
  console.log(req.query);
  User.findOne({
    where: {
      id: req.query.userId
    }
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    } else {
      Transaction.findAll({
        where: {
          userID: user.id,
          createdAt: {
            $between: [req.query.queryStartDate, req.query.queryEndDate]
          }
        }
      })
      .then((tran) => {
        return res.success({
          code: 0,
          transaction: tran
        });
      });
    }
  })
  .catch((err) => {
    console.error('Error occurs in /account/get_transaction with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

module.exports = router;
