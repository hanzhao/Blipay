const Sequelize = require('sequelize');

module.exports = (db) => {
  return db.define('OrderItem',{
    /* 订单中商品数量 */
    count: {
      type: Sequelize.INTEGER,
      validate: {
        notNull: true
      }
    }
  });
<<<<<<< HEAD
};
=======
<<<<<<< HEAD
};
=======
};
>>>>>>> ac6e5dd1f1a982cc515dd8e25514bf5dcab79f79
>>>>>>> c5c82097afa011e1e504412a8426700b540f36ce
