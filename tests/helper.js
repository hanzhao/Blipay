global.Promise = require('bluebird');
const proxy = require('express')();
const bodyParser = require('body-parser');
const ConnectRedis = require('connect-redis');
const session = require('express-session');
const config = require('../config');
const RedisStore = ConnectRedis(session);

proxy.use(bodyParser.json());
proxy.use(bodyParser.urlencoded({ extended: true }));
proxy.use(session({
  name: 'blipay.sid',
  secret: config.cookie.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new RedisStore(config.redis)
}));

proxy.use((req, res, next) => {
  res.success = function (data) {
    return this.json({
      code: 0,
      data: data
    });
  };
  res.fail = function(data) {
    return this.json({
      code: -1,
      error: data
    });
  };
  next();
});

module.exports = proxy;
