module.exports = {
  cookie: {
    secret: 'Wxdf3_2Pmzrxfa'
  },
  database: {
    db: 'blipay',
    username: 'blipay',
    password: 'blipay',
    dialect: 'mysql',
    host: 'localhost',
    pool: {
      min: 0,
      max: 10,
      idle: 1000
    }
  },
  upload: './upload'
};
