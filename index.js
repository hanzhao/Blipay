'use strict';
// 使用 Bluebird Promise 库
global.Promise = require('bluebird');
global.ROOT = __dirname;

const glob = require('glob');
const http = require('http');
// Express 服务器框架
const express = require('express');
// 解析 body
const bodyParser = require('body-parser');
// 解析 cookie
const cookieParser = require('cookie-parser');
// 连接 session
const session = require('express-session');
// 打印连接日志
const logger = require('morgan');
// 图标
const favicon = require('serve-favicon');
// 使用 Redis 提供 Session 存储
const ConnectRedis = require('connect-redis');


// webpack 构建
const webpack = require('webpack');
// webpack 实时编译
const webpackDevMiddleware = require('webpack-dev-middleware');
// webpack 热模块替换
const webpackHotMiddleware = require('webpack-hot-middleware');

const env = process.env.NODE_ENV || 'development';
global.isProduction = (env === 'production');
const port = process.env.PORT || 3000;
const RedisStore = ConnectRedis(session);
const config = require('./config');
const socketIOSession = require('socket.io.session');
const sessionStore = new RedisStore(config.redis);

const sessionSettings = {
  name: 'blipay.sid',
  secret: config.cookie.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: sessionStore
};

// 创建 app
const app = express();
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = (env === 'development');

// 注册各种中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(config.cookie.secret));
app.use(session(sessionSettings));
app.use(favicon(`${ROOT}/public/favicon.ico`));

/* 静态资源 */
if (env === 'development') {
  const compiler = webpack(require('./webpack.config.dev'));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    stats: { colors: true }
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(`${ROOT}/public`));
// 提供快捷的 res.success / res.fail
app.use((req, res, next) => {
  res.success = function (data) {
    return this.json({
      code: 0,
      data: data
    });
  };
  res.fail = function (data) {
    return this.json({
      code: -1,
      error: data
    });
  };
  next();
});

// models
require('./models');

app.use(require('./controllers'));

// 错误处理
app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
  console.error(err);
});

const server = http.createServer(app);

// 开始监听
server.listen(port, () => {
  console.log(`App is listening on port ${server.address().port}`);
});

// Chat

// Socket.io
const io = require('socket.io')(server);

const socketSession = socketIOSession(sessionSettings);


io.use(socketSession.parser);
const users = [];
const sockets = [];

io.on('connection', function (socket) {
  console.log('connected!');
  if (!socket.session.userId)
    return;
  let userId = socket.session.userId;
  let userName = socket.session.userName;
  // Welcome message on connection
  socket.emit('connected', 'Welcome to the chat server ' + userName);

  users[userId] = { userId: userId, userName: userName };
  sockets[userId] = socket;
  console.log('User in: ' + userId + ' ' + userName);
  socket.broadcast.emit('userList', { users: users });

  socket.on('reqUserList', () => {
    socket.emit('userList', { users: users });
  });

  socket.on('send', (data) => {
    console.log('send', data);
    const dstSocket = sockets[data.userId];
    if (dstSocket) {
      dstSocket.emit('msg', { from: userId, text: data.text });
    }
    else {
      // TODO
    }
  });

  // Clean up on disconnect
  socket.on('disconnect', () => {
    socket.broadcast.emit('userOut', { userId: userId });
    delete users[userId];
  });
});
