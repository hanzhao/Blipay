'use strict'
const { Router } = require('express');
const accountRouter = require('./account');
const orderRouter = require('./order');
const rootRouter = require('./root');

const apiRouter = Router();
apiRouter.use(accountRouter);
apiRouter.use(orderRouter);
apiRouter.all('*', (req, res) => res.status(404).send('Not Found'))

const router = Router();
router.use('/api', apiRouter);
router.use(rootRouter);

module.exports = router;
