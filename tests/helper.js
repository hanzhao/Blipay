global.Promise = require('bluebird');
const proxy = require('express')();
const bodyParser = require('body-parser');

proxy.use(bodyParser.json());
proxy.use(bodyParser.urlencoded({ extended: true }));

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
