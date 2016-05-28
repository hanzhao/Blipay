const Router = require('express').Router;
const router = Router();

router.get('/', (req, res) => {
  res.send('Hello world.');
});

router.get('*', (req, res) => {
  res.sendFile(`${ROOT}/public/index.html`);
});

module.exports = router;
