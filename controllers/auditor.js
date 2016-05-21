const Auditor = require('../models').User;
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
    const auditor = yield Auditor.findOne({where: {userName: req.body.userName}});
    if (!auditor) {
      return res.fail({code: -1});
    }
    if (cookPassword(
          req.body.loginPass, 
          auditor.loginSalt, 
          config.loginSaltPos
        ) === auditor.loginPass) {
      yield auditor.update({lastLogin: Date().toString()}, {where: {id: auditor.id}});
      /*const transactions = yield Transaction.findAll({ 
                                   where: {userId: auditor.id},
                                   order: ['createdAt'],
                                   limit: 10
                                 });*/
      return res.success({
        code: 0,
        userId: auditor.id,
        lastLogin: (new Date(auditor.lastLogin)).toLocaleString(),
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
  Auditor.findOne({
    where: {
      id: req.query.userId
    }
  }).then((auditor) => {
    if (!auditor) {
      console.log('check_loginpass: userId not exists');
      return res.fail({
        code: -1
      });
    }
    if (cookPassword(
          req.query.loginPass, 
          auditor.loginSalt, 
          config.loginSaltPos)  === auditor.loginPass) {
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
  Auditor.findOne({
    where: {
      userName: req.query.userName
    }
  }).then((auditor) => {
    if (!auditor) {
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

module.exports = router;
