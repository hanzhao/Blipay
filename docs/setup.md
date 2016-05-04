# Blipay 开发环境搭建

注意，以下的步骤默认系统环境为 Linux，OS X 下步骤不会有太大差异。但 Windows 需要根据需要自己的需要修改步骤，欢迎提交 Pull Request 来修改这个部署文档并且给以后的用 Windows 的同学一些参考。

## 穿越长城，迈向世界

不少地方需要一个代理支持，这步需要自己折腾。

## Git

安装 Git 后请务必在 `~/.gitconfig` 中加入以下配置。这可以使得每一次调用 `git pull` 等价于调用 `git pull --rebase`，保证 git 用 rebase 的方式让本地分支和远程分支同步，使得 Git 树更好看直观。

```
[pull]
rebase = true
```

## Redis 和 MySQL

在 Linux 和 OS X 下，这两个东西可以通过软件管理工具(apt-get, pacman, yum, brew 等)自动下载并安装。

安装完启动 Redis 和 MySQL，通常 Redis 监听在 6379 端口，MySQL 监听在 3306 端口，我们不用修改这个。

Ubuntu 通常通过 `service redis start` 之类的方式启动服务，ArchLinux、Debian 等 systemd 系统通常使用 `systemctl start redis` 之类的方式。

MySQL 需要建立名为 blipay 的库，并且创建用户名 blipay，密码为 blipay 的用户并授予数据库的访问权限。

## Node.js 环境搭建

比较推荐的方法是使用 nvm 自动下载安装和管理 Node.js，这一步可以参考 [nvm 的 GitHub](https://github.com/creationix/nvm)。

Node.js 的版本更新比较积极，新版本出 bug 的可能性也非常大。为了避免不必要的麻烦，我们选择用 Node.js v4 版本，这个版本可以在享受新特性的同时保证较好的稳定性。

于是使用 nvm 安装 Node.js v4 版本（目前最新的是 v4.4.2），并且把 Node.js v4 设为默认版本。

```
[nya@biu ~]$ nvm i 4
######################################################################## 100.0%
Checksums empty
Now using node v4.4.2 (npm v2.14.20)
[nya@biu ~]$ nvm alias default 4
default -> 4 (-> v4.4.2)
[nya@biu ~]$ node -v
v4.4.2
```

Node.js 的社区库大部分用 npm 管理，由于你懂得的原因，在国内使用 npm 不是非常方便。淘宝搭建了一个 [npm 的镜像](https://npm.taobao.org/)，我们可以使用他们提供的 cnpm 来获得更方便的 npm 服务。如果你配置了全局代理等，可以跳过这一步。

```
[nya@biu ~]$ npm install -g cnpm --registry=https://registry.npm.taobao.org
/home/nya/.nvm/versions/node/v4.4.1/bin/cnpm-check -> /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm/bin/cnpm-check
/home/nya/.nvm/versions/node/v4.4.1/bin/cnpm-sync -> /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm/bin/cnpm-sync
/home/nya/.nvm/versions/node/v4.4.1/bin/cnpm -> /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm/bin/cnpm
/home/nya/.nvm/versions/node/v4.4.1/bin/cnpm-doc -> /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm/bin/cnpm-doc
/home/nya/.nvm/versions/node/v4.4.1/bin/cnpm-web -> /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm/bin/cnpm-web
/home/nya/.nvm/versions/node/v4.4.1/bin/cnpm-user -> /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm/bin/cnpm-user
/home/nya/.nvm/versions/node/v4.4.1/bin/cnpm-search -> /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm/bin/cnpm-search
cnpm@4.2.0 /home/nya/.nvm/versions/node/v4.4.1/lib/node_modules/cnpm
├── auto-correct@1.0.0
├── giturl@1.0.0
├── open@0.0.5
├── bagpipe@0.3.5
├── colors@1.1.2
├── commander@2.7.1 (graceful-readlink@1.0.1)
├── cross-spawn@0.2.9 (lru-cache@2.7.3)
├── npm-request@0.0.4 (urllib@0.5.11)
├── debug@2.2.0 (ms@0.7.1)
├── npm@3.8.3
├── urllib@2.8.0 (media-typer@0.3.0, statuses@1.2.1, any-promise@1.1.0, humanize-ms@1.0.1, iconv-lite@0.4.13, digest-header@0.0.1, default-user-agent@1.0.0)
└── npminstall@1.5.1 (destroy@1.0.4, bytes@2.2.0, co@4.6.0, ms@0.7.1, await-event@1.0.0, binary-mirror-config@1.0.2, runscript@1.1.0, semver@5.1.0, node-uuid@1.4.7, minimist@1.2.0, mkdirp@0.5.1, urllib@2.7.3, npm-package-arg@4.1.0, cmd-shim@2.0.2, tar@2.2.1, co-parallel@1.0.0, utility@1.6.0, mz@2.3.1, chalk@1.1.1, co-fs-extra@1.2.1, rimraf@2.5.2, node-gyp@3.2.1)
[nya@biu ~]$ cnpm -v
4.2.0
```

之后可以用 cnpm 命令代替所有的 npm 命令，会有更快的安装速度。

## 从 GitHub 上拉取 Blipay 项目

```
[nya@biu ~]$ git clone git@github.com:magicae/Blipay.git
Cloning into 'Blipay'...
remote: Counting objects: 5, done.
remote: Compressing objects: 100% (4/4), done.
remote: Total 5 (delta 0), reused 5 (delta 0), pack-reused 0
Receiving objects: 100% (5/5), done.
Checking connectivity... done.
```

## 安装项目的依赖

```
[nya@biu ~]$ cd Blipay
[nya@biu Blipay] cnpm i
```

在大量的下载后，整个项目的依赖库都将下载完毕。

## 开始

```
[nya@biu ~]$ npm start
```

至此，开发环境搭建已经结束。

## 使用的库的基本概念

### Node.js

Node.js 是一个使用 JavaScript 编写服务端软件的环境。因为大量的 I/O 都是基于 JavaScript 的事件机制，所以这些 I/O 都是非阻塞的、异步的，所以这使得 Node.js 的性能对于平时的脚本语言来说相当好。Node.js 原生提供了 http 库，并且可以创建 http 服务器，以至于大家都使用 Node.js 来编写 http 服务器。

具体文档参考[官方文档](https://nodejs.org/en/docs/)。

### Sequelize

Node.js ORM 库，参考[官方文档](http://docs.sequelizejs.com/en/latest/)。

### React

React 是一个前端 View 层的库，提供前端模板、双向数据绑定、模块化组件等开发思路。通过 React，可以很方便的实现一个基本组件并使得它在页面中复用。

具体文档参考[官方文档](http://facebook.github.io/react/)。

基于 React，我们有很多很有趣的库可以使用。

+ react-router
+ react-redux
+ react-router-redux
+ react-async-connect

### Redux

一个 JavaScript 状态管理器，可以提供整个页面的状态管理。对于 React 来说，每个组件都有自己的状态，并且通过 render 函数将自己的状态映射到实际的 DOM 树上。这带来了一个问题，每个组件都是独立的，并且组件间通信在 React 中足够麻烦，所以 Redux 这种完全接管整个页面状态的库就产生了。

Redux 大量借鉴了函数式编程的思想，一开始理解可能比较困难，推荐从[官方文档](https://github.com/reactjs/redux)入手，有不懂的地方可以直接联系我。

### Webpack

前端资源打包工具，参考[官方文档](http://webpack.github.io/)。

### Babel

JavaScript 转译工具，可以让你直接写 ECMAScript 2016 代码。Babel 通过转译，让他成为 ES5 可用的代码，这样就可以在 IE9 及以上运行了。参考[官方主页](http://babeljs.io/)。

### ECMAScript 2016

目前打算是后端只用 Node.js 自带部分的 ES2015 语法（）。但是前端开放 ES2016-Stage0 + JSX 的所有语法。

通过 ECMAScript 2015/2016，你可以

+ 使用 class

```js
class A extends B {
  // 构造函数
  constructor() {
    // super()
  }
  foo() {

  }
  bar() {

  }
}
```

+ 使用 Arrow Function

```js
function func(a, b, c) {

}
// ==>
func = (a, b, c) => {

}
```

这个在各种匿名函数的时候很爽

+ 使用 Promise，Generator

对于 JavaScript 的各种异步控制，可以看[这篇文章](http://zhuanlan.zhihu.com/p/19750470)入门。

提供一个服务端的异步控制方式，使用 bluebird 库和 Generator Function。

在 ES2016 环境中，可以使用 async/await，和下面的代码大致相同，可以看成 `Promise.coroutine(function *)  ==> async`，然后 `yield ==> await`。

```js
// 读取 3 个文件的内容，并且拼接
const Promise = require('bluebird') // 引入 bluebird Promise 库
const fs = require('fs') // 引入 Node.js 文件系统库
Promise.promisifyAll(fs) // 将 Node.js 的异步库 promise 化

const files = [
  '/tmp/file1', '/tmp/file2', '/tmp/file3'
]

const proc = Promise.coroutine(function* () {
  let ret = ''
  for (let i = 0; i < files.length; ++i) {
    ret += yield fs.readFileAsync(files[i])
  }
  return ret
})

proc().then((ret) => {
  console.log(ret)
}) // 成功
.catch((err) => {
  console.error(err)
}) // 失败

```

这类异步控制大量优化了 Node.js 原先的控制流（callback），请务必掌握。

+ 使用字符串模板

```js
const world = '世界'
console.log(`Hello, ${world}`) // => Hello, 世界
```

+ 使用可计算的 Object Property

```js
const key = 'hahahlolo'
const obj = {
  [key]: 'biubiubiu'
}
// obj = {hahahlolo: 'biubiubiu'}
```

+ 解构

```js
const a = [1, 2, 3]
const b = [...a, 4, 5] // [1, 2, 3, 4, 5]
const c = {
  a: 1
}
const d = {
  ...c,
  b: 2
} // {a: 1, b: 2}
```

+ let, const

`let` 为块级作用域，`const` 为常量（定义后不可改变变量实际引用的对象）。

**不要再用 `var` 了**
