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
  console.log('in /account/register');
  console.log(req.body);
  User.findOne({
    where: {
      userName: req.body.userName
    }
  })
  .then((user) => {
    if (user) {
      throw new Error('The same userName exists.');
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
  .then(() => {
    return res.success({
      code: 0
    });
  })
  .catch((err) => {
    console.error('Error occurs in /accout/register with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

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
      res.success({
        code: 0,
        userId: user.id
      });
    } else {
      res.fail({
        code: -3
      });
    }
  })
  .catch((err) => {
    console.error('Error occurs in /accout/register with following message.\n' +
                 err.message);
    return res.fail({
      code: -2
    });
  });
});

// TODO
router.get('/account/check_paypass', (req, res) => {
  console.log('in check_paypass');
  return res.success({
    code: 0
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
      return res.success({
        code: 0
      });
    } else {
      return res.fail({
        code: -1
      });
    }
  }).catch(() => {
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
