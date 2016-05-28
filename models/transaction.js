/*
 * 用于存放用户充值/提现记录的数据表
 */
const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('transaction', {
    /*
     * 用户id（该字段会由Transaction.belongsTo(User)自动生成）
     *
     * userId: {
     *   type: Sequelize.INTEGER,
     *   references: {
     *      model: User
     *      key: 'id'
     *   }
     * },
     */
    /*
     * 操作发生的时间（该字段由Sequelize自动生成）
     *
     * createdAt: {
     *   type: Sequelize.DATE
     * },
     */
    /* 操作涉及的金额 */
    amount: {
      type: Sequelize.DECIMAL(12, 2)
    },
    /* 交易类型，1为充值，2为提现 */
    type: {
      type: Sequelize.INTEGER
    },
    /* 交易状态, 0为进行中, 1为成功, 2为失败 */
    status: {
      type: Sequelize.INTEGER
    },
    info: {
      type: Sequelize.STRING
    }
  });
};
