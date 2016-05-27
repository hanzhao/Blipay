const User = require('../models').User;
const Transaction = require('../models').Transaction;
const Order = require('../models').Order;
const Record = require('../models').Record;
const config = require('../config/auditor');
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

router.post('/auditor/login', Promise.coroutine(function *(req, res) {
  console.log('in /auditor/login');
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
      yield user.update({lastLogin: Date().toString()}, {where: {id: user.id}});
      /*const transactions = yield Transaction.findAll({ 
                                   where: {userId: user.id},
                                   order: ['createdAt'],
                                   limit: 10
                                 });*/
      return res.success({
        code: 0,
        userId: user.id,
        lastLogin: (new Date(user.lastLogin)).toLocaleString(),
      });
    } else {
      return res.fail({code: -3});
    }
  } catch (e) {
    console.error(e.message)
    return res.fail({code: -2});
  }
}));

router.get('/auditor/check_loginpass', (req, res) => {
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

router.get('/auditor/check_username', (req, res) => {
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

router.post('/auditor/logout', (req, res) => {
  console.log('in logout');
  if(req.session.userId) {
    delete req.session.userId;
    return res.success({});
  } else {
    return res.fail({});
  }
});


router.get('/auditor/get_transaction', (req, res) => {
  console.log('in /auditor/get_transaction');
  console.log(req.query);
  User.findAll({  
  })
  .then((user) => {
    if (!user) {
      return res.fail({
        code: -1
      });
    } else {
      Order.findAll({
        where: {
          createdAt: {
            $between: [req.query.queryStartDate, req.query.queryEndDate]
          }
        }
      })
      .then((tran) => {
        return res.success({
          code: 0,
          order: tran
        });
      });
    }
  })
  .catch((err) => {
    console.error('Error occurs in /auditor/get_transaction with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

router.post('/auditor/getdata', (req, res) => {
  console.log('in /auditor/getdata');
  console.log(req.body);
  Order.findAll({
    })
  .then(()=>{
  const buyertransid = Order.buyerTransId;
  const sellertransid = Order.sellerTransId;

  Transaction.findOne({
      where:{
        id:buyertransid
      }

  })
  .then(()=>{
    const customertrans = Transaction.amount
  })

  Transaction.findOne({
    where:{
      id:sellertransid
    }
  })
  .then(()=>{
    const sellertrans = Transaction.amount
  })


    if (true){
        const newrecord ={
           cost:Order.totalCost,
           customerTrans:customertrans,
           sellerTrans:sellertrans,
           status:Order.status,
           wrongType:1,
           info:1
        }
        Record.create(newrecord)
}
})
  .catch((err) => {
    console.error('Error occurs in /auditor/getdata with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

  



module.exports = router;
