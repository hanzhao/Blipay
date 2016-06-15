'use strict'
const Router = require('express').Router;
const accountRouter = require('./account');
const orderRouter = require('./order');
const attachmentRouter = require('./attachment');
const rootRouter = require('./root');
const adminRouter = require('./admin');
const auditorRouter = require('./auditor');

/** API 路由，将不同模块的后端请求分发 */
const apiRouter = Router();
apiRouter.use(accountRouter);
apiRouter.use(orderRouter);
apiRouter.use(attachmentRouter);
apiRouter.use(adminRouter);
apiRouter.use(auditorRouter);
apiRouter.all('*', (req, res) => res.status(404).send('Not Found'));

const router = Router();
router.use('/api', apiRouter);
router.use(rootRouter);

module.exports = router;
