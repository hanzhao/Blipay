const development = require('./development');
const production = require('./production');

module.exports = {
  development: development,
  production: production
}[process.env.NODE_ENV || 'development'];
