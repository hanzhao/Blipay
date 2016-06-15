/** 图片附件 */
'use strict';

/** 附件表 */
const Attachment = require('../models').Attachment;
const multer = require('multer');
const Router = require('express').Router;
const router = Router();
const fs = Promise.promisifyAll(require('fs'));

const upload = multer({ dest: '/tmp' })

/** 添加图片 */
router.post('/photo/new', upload.single('photo'),
  Promise.coroutine(function* (req, res) {
    /** 权限验证 */
    if (!req.session.userId) {
      return res.status(403).fail()
    }
    if (!(/^image\/.*/.test(req.file.mimetype))) {
      return res.status(400).fail('只能上传图片文件！')
    }
    // 不能大于 2MB
    if (req.file.size > 2097152) {
      return res.status(400).fail('不能上传大于 2MB 的文件！')
    }
    const buf = yield fs.readFileAsync(req.file.path)
    const attachment = yield Attachment.create({
      userId: req.session.userId,
      blob: buf
    })
    return res.success({ attachmentId: attachment.id })
  })
);

/** 获取图片 */
router.get('/photo/show', Promise.coroutine(function* (req, res) {
  const attachment = yield Attachment.findById(req.query.id, {
    attributes: ['blob']
  })
  if (!attachment) {
    return res.status(404).end()
  }
  return res.end(attachment.blob)
}));

module.exports = router;
