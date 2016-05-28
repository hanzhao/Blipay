'use strict'
const Router = require('express').Router;
const accountRouter = require('./account');
const orderRouter = require('./order');
const attachmentRouter = require('./attachment');
const rootRouter = require('./root');
const auditorRouter = require('./auditor')

const apiRouter = Router();
apiRouter.use(accountRouter);
apiRouter.use(orderRouter);
apiRouter.use(attachmentRouter);
apiRouter.use(auditorRouter);
apiRouter.all('*', (req, res) => res.status(404).send('Not Found'))

const router = Router();
router.use('/api', apiRouter);
router.use(rootRouter);

module.exports = router;
