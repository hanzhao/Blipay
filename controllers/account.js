const User = require('../models').User;
const config = require('../config/account');
const Router = require('express').Router;
const crypto = require('crypto');
const router = Router();

const cookPassword = (key, salt, saltPos) => {
  var hash = crypto.createHash('sha512');
  return hash.update(key.slice(0, saltPos))
    .update(salt)
    .update(key.slice(saltPos))
    .digest('base64');
};

router.post('/account/register', (req, res) => {
  User.findOne()
    .then((user) => {
      if (user) {
        throw new Error('该用户名已被注册。');
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
      return User.create(newUser);
    })
    /* eslint-disable */
    /* wait for TODO */
    .then((user) => {
    /* eslint-enable */
      // TODO: after creating user correctly.
    })
    .catch((err) => {
      // TODO: some error occurs during registration
      return res.json({
        message: err.message
      });
    });
});

router.post('/account/login', (req, res) => {
  User.findOne()
    .then((user) => {
      if (!user) {
        throw new Error('该用户名未被注册。');
      }
      // TODO: authenticate login
    })
    .catch((err) => {
      // TODO: some error occurs during login
      return res.json({
        message: err.message
      });
    });
});

module.exports = router;
