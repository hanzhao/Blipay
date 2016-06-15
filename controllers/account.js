/** 用户账户模块 */
'use strict';
const _ = require('lodash');
const db = require('../models').db;
/** 用户表 */
const User = require('../models').User;
/** 转账记录表 */
const Transaction = require('../models').Transaction;
/** 配置 */
const config = require('../config/account');
/** 后端路由 */
const Router = require('express').Router;
/** 加密模块 */
const crypto = require('crypto');
const router = Router();
/** 邮件工具 */
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.mailConfig);
/** 密码处理 */
const cookPassword = require('../services/account').cookPassword;

/** 实名验证接口 */
router.post('/account/apply_verification',
  Promise.coroutine(function* (req, res) {
    if (!req.session.userId) {
      return res.status(403).fail();
    }
    /** 获取当前用户 */
    const user = yield User.findById(req.session.userId, {
      attributes: ['id', 'cardFront', 'cardBack', 'status']
    });
    /** 存储证件照 */
    user.cardFront = req.body.attachments[0];
    user.cardBack = req.body.attachments[1];
    user.status = 1;
    yield user.save();
    return res.success({ user });
  })
);

/** 用户注册接口 */
router.post('/account/register', Promise.coroutine(function* (req, res) {
  let user = yield User.findOne({
    where: { userName: req.body.userName },
    attributes: ['id', 'userName']
  });
  if (user) {
    return res.fail({ type: 'USERNAME_EXIST' });
  }
  /** 密码加盐加密处理 */
  const salt = crypto.randomBytes(64).toString('base64');
  /**新建用户 */
  const newUser = {
    userName: req.body.userName,
    salt: salt,
    loginPass: cookPassword(req.body.loginPass, salt),
    payPass: cookPassword(req.body.payPass, salt),
    lastLogin: new Date().toString()
  };
  user = yield User.create(newUser)
  /** 用户信息存到 session */
  req.session.userId = user.id
  req.session.userName = user.userName
  return res.success({});
}));

/** 用户登录 */
router.post('/account/login', Promise.coroutine(function* (req, res) {
  let user = yield User.findOne({
    where: { userName: req.body.userName },
    attributes: ['id', 'userName', 'loginPass', 'salt', 'lastLogin', 'disabled']
  });
  /** 用户不存在 */
  if (!user) {
    return res.fail({ type: 'USER_NOT_EXIST' });
  }
  /** 用户被禁用 */
  if (user.disabled) {
    return res.fail({ type: 'USER_DISABLED' });
  }
  const password = cookPassword(req.body.loginPass,
                                user.salt);
  // 密码错误
  if (password !== user.loginPass)
    return res.fail({ type: 'INVALID_USERNAME_OR_PASSWORD' });
  // 更新最后登录时间
  user.lastLogin = new Date().toString();
  yield user.save();
  // 删除密码字段
  delete user.salt;
  delete user.loginPass;
  // 登录信息
  req.session.userId = user.id
  req.session.userName = user.userName
  return res.success({ user });
}));

/** 用户注销登录 */
router.get('/account/logout', (req, res) => {
  req.session.userId = null;
  return res.success({});
});

/** 获取用户信息 */
router.get('/account/info', Promise.coroutine(function* (req, res) {
  /** 验证登陆状态 */
  if (!req.session.userId) {
    return res.success({ });
  }
  const user = yield User.findById(req.session.userId, {
    attributes: ['userName', 'realName', 'balance', 'lastLogin',
                 'email', 'phone', 'idNumber', 'status', 'id', 'booker']
  });
  return res.success({ user });
}));

/** 获取转账记录 */
router.get('/account/transactions', Promise.coroutine(function* (req, res) {
  /** 验证权限 */
  if (!req.session.userId) {
    return res.status(403).fail();
  }
  const user = yield User.findById(req.session.userId);
  const transactions = yield user.getTransactions({
    order: ['id']
  });
  return res.success({ transactions });
}));

/** 验证支付密码 */
router.post('/account/check_paypass', Promise.coroutine(function* (req, res) {
  /** 验证权限 */
  if (!req.session.userId) {
    return res.status(403).fail();
  }
  const user = yield User.findById(req.session.userId, {
    attributes: ['salt', 'payPass']
  });
  const payPass = cookPassword(req.body.payPass, user.salt);
  if (payPass === user.payPass) {
    return res.success();
  } else {
    return res.fail({ type: 'WRONG_PAYPASS' });
  }
}));

/** 验证登录密码 */
router.post('/account/check_loginpass', Promise.coroutine(function *(req, res) {
  /** 权限验证 */
  if (!req.session.userId) {
    return res.status(403).fail();
  }
  const user = yield User.findById(req.session.userId, {
    attributes: ['salt', 'loginPass']
  });
  const loginPass = cookPassword(req.body.loginPass, user.salt);
  if (loginPass === user.loginPass) {
    return res.success();
  } else {
    return res.fail({ type: 'WRONG_LOGINPASS'});
  }
}));

/** 身份证验证 */
router.get('/account/check_id', Promise.coroutine(function *(req, res) {
  const user = yield User.findOne({
    where: { idNumber: req.query.idNumber }
  });
  if (user) {
    return res.fail({ type: 'ID_EXIST' });
  }
  return res.success();
}));

/** 检查用户名是否存在 */
router.get('/account/check_username', Promise.coroutine(function* (req, res) {
  const user = yield User.findOne({
    where: { userName: req.query.userName }
  });
  if (!user) {
    return res.success();
  } else {
    return res.fail({ type: 'USERNAME_EXIST' });
  }
}));

/** 更新用户信息 */
router.post('/account/update_info', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.userId) {
    return res.status(403).fail();
  }
  const attrs = ['realName', 'idNumber', 'email', 'phone'];
  const user = yield User.findById(req.session.userId, {
    // 必须要选出主键，后面才可以保存
    attributes: attrs.concat(['id'])
  });
  for (let key in req.body) {
    if (_.includes(attrs, key)) {
      user[key] = req.body[key];
    }
  }
  yield user.save();
  res.success({ user });
}));

router.post('/account/change_paypass', Promise.coroutine(function *(req, res) {
  /** 权限验证 */
  if (!req.session.userId) {
    return res.status(403).fail();
  }
  const user = yield User.findById(req.session.userId, {
    attributes: ['id', 'salt', 'payPass']
  });
  user.payPass = cookPassword(req.body.payPass, user.salt);
  yield user.save();
  return res.success();
}));

/** 更改登录密码 */
router.post('/account/change_loginpass',
  Promise.coroutine(function *(req, res) {
    if (!req.session.userId) {
      return res.status(403).fail();
    }
    const user = yield User.findById(req.session.userId, {
      attributes: ['id', 'salt', 'loginPass']
    });
    user.loginPass = cookPassword(req.body.loginPass, user.salt);
    yield user.save();
    return res.success();
  })
);

/** 充值 */
router.post('/account/topup', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.userId) {
    return res.status(403).fail();
  }
  const delta = parseFloat(req.body.amount);
  /** 数值验证 */
  if (isNaN(delta)) {
    return res.status(400).fail();
  }
  let user = yield User.findById(req.session.userId, {
    attributes: ['payPass', 'salt']
  });
  /** 充值密码验证 */
  if (user.payPass !== cookPassword(req.body.password, user.salt)) {
    return res.fail({ type: 'INCORRECT_PASSWORD' });
  }
  yield User.update({
    balance: db.literal(`balance + ${delta}`)
  }, {
    where: { id: req.session.userId }
  });
  const transaction = yield Transaction.create({
    userId: req.session.userId,
    amount: delta,
    type: 1,
    status: 1,
    info: `充值 ${delta} 元`
  });
  user = yield User.findById(req.session.userId, {
    attributes: ['balance']
  });
  return res.success({ user, transaction });
}));

/** 提现接口 */
router.post('/account/withdraw', Promise.coroutine(function* (req, res) {
  /** 权限验证 */
  if (!req.session.userId) {
    return res.status(403).fail();
  }
  const delta = parseFloat(req.body.amount);
  if (isNaN(delta)) {
    return res.status(400).fail();
  }
  /** 查找用户 */
  let user = yield User.findById(req.session.userId, {
    attributes: ['balance', 'salt', 'payPass']
  });
  if (user.payPass !== cookPassword(req.body.password, user.salt)) {
    return res.fail({ type: 'INCORRECT_PASSWORD' });
  }
  if (user.payPass < delta) {
    return res.fail({ type: 'INSUFFICIENT_BALANCE' });
  }
  /** 更新信息 */
  yield User.update({
    balance: db.literal(`balance - ${delta}`)
  }, {
    where: { id: req.session.userId }
  });
  const transaction = yield Transaction.create({
    userId: req.session.userId,
    amount: -delta,
    type: 2,
    status: 1,
    info: `提现 ${delta} 元`
  });
  user = yield User.findById(req.session.userId, {
    attributes: ['balance']
  });
  return res.success({ user, transaction });
}));

/** 找回密码 */
router.post('/account/find_password',
  Promise.coroutine(function* (req, res) {
    let user = yield User.findOne({
      where: { userName: req.body.userName },
      attributes: ['email', 'id', 'salt', 'loginPass']
    });
    if (!user) {
      return res.fail({ type: 'USER_NOT_EXIST' });
    }
    if (user.email !== req.body.email) {
      return res.fail({ type: 'INVALID_EMAIL' });
    }
    let loginPass = crypto.randomBytes(12).toString('base64');
    user.loginPass = cookPassword(loginPass, user.salt);
    yield user.save();
    /** 发送邮件 */
    yield transporter.sendMail({
      from: config.from,
      to: user.email,
      subject: 'Blipay密码重置通知',
      text: `您的新登录密码是${loginPass}，请在登录后尽快修改密码。`
    });
    return res.success({ user });
  })
);

module.exports = router;
