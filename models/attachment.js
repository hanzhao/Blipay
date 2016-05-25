/*
 * 各种附件，比如商品图片
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('attachment', {
    // 附件类型
    // 0: 任意类型, 1: 图片, 2: 音乐
    type: {
      type: Sequelize.INTEGER
    },
    // 二进制内容
    blob: {
      type: Sequelize.BLOB('medium')
    }
  })
}
