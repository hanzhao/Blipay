/** 订单 */
'use strict';

const Promise = require('bluebird');
/** 商品 */
const Item = require('../models').Item;
/** 用户 */
const User = require('../models').User;
/** 房间 */
const Room = require('../models').Room;
/** 订单 */
const Order = require('../models').Order;
/** 图片附件 */
const Attachment = require('../models').Attachment;
/** 商品附件关系表 */
const ItemAttachment = require('../models').ItemAttachment;
/** 商品评价 */
const Review = require('../models').Review;
/** 仲裁 */
const Arbitration = require('../models').Arbitration;

/** 后端路由 */
const Router = require('express').Router;
const router = Router();

/** 创建商品接口 */
const createItem = require('../services/order').createItem;
/** 商品获取 */
const getItem = require('../services/order').getItem;
const getItems = require('../services/order').getItems;
/** 订单创建 */
const createOrder = require('../services/order').createOrder;
/** 请求支付 转账接口 */
const requestPay = require('../services/account').requestPay;
const requestReceive = require('../services/account').requestReceive;

/** 新建商品 */
router.post('/item/new', Promise.coroutine(function* (req, res) {
  console.log('in /item/new', req.body);
  const item = yield createItem(req.session.userId, req.body);
  const reviews = yield item.getReviews();
  return res.success({ id: item.id, reviews: reviews });
}));

/** 展示商品 */
router.get('/item/show', Promise.coroutine(function* (req, res) {
  console.log('in /item/show', req.query);
  const item = yield getItem(req.query.id);
  if (!item) {
    return res.status(404).fail();
  }
  return res.success({ item })
}));

/** 验证字段 */
const validate = (i) => {
  return typeof (i) != 'undefined';
};

/** 获取商品列表 */
router.get('/items', Promise.coroutine(function* (req, res) {
  const items = yield getItems()
  return res.success({ items });
}))

/** 条件筛选 */
router.post('/item/item_list', Promise.coroutine(function* (req, res) {
  console.log('in /item/item_list');
  console.log(req.body);
  try {
    /** 直接通过 id 筛选 */
    if (validate(req.body.id)) {
      const item = yield Item.findOne({
        where: { id: req.body.id }, order: req.body.base + req.body.order
      });
      return res.success({ items: [item] });
    }
    let filter = {};
    /** 卖家 */
    if (validate(req.body.sellerId)) {
      filter.sellerId = req.body.sellerId;
    } else {
      filter.sellerId = req.session.userId;
    }
    if (validate(req.body.filter)) {

      if (validate(req.body.filter.price)) {
        filter.price = req.body.filter.price;
      }
      if (validate(req.body.filter.time)) {
        filter.createdAt = req.body.filter.time;
      }
      if (validate(req.body.filter.remain)) {
        filter.remain = req.body.filter.remain;
      }
      if (validate(req.body.filter.name)) {
        filter.name = req.body.filter.name;
      }
    }
    return res.success({
      items: yield Item.findAll({
        where: filter,
        order: (req.body.base + req.body.order) || 'id DESC',
        offset: req.body.head || 0,
        limit: req.body.length || 1000,
        include: [{
          model: Attachment,
          through: ItemAttachment,
          attributes: ['id']
        }]
      })
    });
  }
  catch (e) {
    return res.fail('in /item/item_list   ' + e.message);
  }
}));

/** 商品更新 */
router.post('/item/update', Promise.coroutine(function* (req, res) {
  console.log('in /item/update');
  console.log(req.body);
  try {
    const item = yield Item.findOne({ where: { id: req.body.id } });
    if (!item) {
      return res.fail({ type: 'NO_ITEM' })
    }
    // TODO: check item owner and authentication
    if (item.sellerId != req.session.userId) {
      return res.fail({ type: 'AUTH_FAIL' })
    }
    yield item.update(req.body);
    return res.success('Item updated.');
  }
  catch (e) {
    return res.fail('in /item/update   ' + e.message);
  }
}));

/** 商品删除 */
router.post('/item/delete', Promise.coroutine(function* (req, res) {
  console.log('in /item/delete');
  console.log(req.body);
  try {
    const item = yield Item.findOne({ where: { id: req.body.id } });
    if (!item) {
      return res.fail({ type: 'NO_ITEM' })
    }
    // TODO: check item owner and authentication
    if (item.sellerId != req.session.userId) {
      throw new Error('Auth Fail.');
    }
    yield item.destroy();
    return res.success('Item destroyed');
  }
  catch (e) {
    return res.fail('in /item/delete   ' + e.message);
  }
}));

/** 新建订单 */
router.post('/order/new', Promise.coroutine(function* (req, res) {
  console.log('in /order/new');
  console.log(req.body);
  try {
    yield createOrder(req.session.userId, req.body.items, req.body.addr);
    return res.success('Order created');
  }
  catch (e) {
    return res.fail('in /order/new   ' + e.message);
  }
}));

/** 删除订单/弃用 */
router.post('/order/delete', Promise.coroutine(function* (req, res) {
  console.log('/order/delete');
  console.log(req.body);
  try {
    const order = yield Order.findOne({ where: { id: req.body.orderId } });
    if (!order) {
      return res.fail({ type: 'NO_ORDER' })
    }
    // TODO: Use transaction

    yield order.destroy();
    return res.success('Order deleted');
  }
  catch (e) {
    return res.fail('in /order/delete   ' + e.message);
  }
}));

/** 更新订单状态 */
router.post('/order/update', Promise.coroutine(function* (req, res) {
  console.log('/order/update');
  console.log(req.body);
  try {
    const order = yield Order.findOne({ where: { id: req.body.orderId } });
    if (!order) {
      return res.fail({ type: 'NO_ORDER' });
    }
    switch (req.body.op) {
      /** 支付订单 */
      case 'pay':
        if (order.status != 0) {
          return res.fail({ type: 'INVALID_OP' })
        }
        if (req.session.userId != order.buyerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        /** 发起扣款请求 */
        const payTrans = yield requestPay(order.buyerId, order.totalCost,
          `成功支付订单 #${order.id}`);
        yield order.update({
          buyerTransId: payTrans,
          status: 1
        });
        break;
      /** 订单发货 */
      case 'ship':
        if (order.status != 1) {
          return res.fail({ type: 'INVALID_OP' })
        }
        // TODO:
        if (req.session.userId != order.sellerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        yield order.update({
          status: 2
        });
        break;
      /** 确认收货 */
      case 'confirm':
        if (order.status != 2) {
          return res.fail({ type: 'INVALID_OP' })
        }
        if (req.session.userId != order.buyerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        const items = yield order.getItems();
        /** 添加商品评价 */
        for (var index = 0; index < items.length; index++) {
          yield items[index].addReview(
            yield Review.create({
              score: req.body.reviews[index].score,
              text: req.body.reviews[index].text,
              userId: req.session.userId
            })
          );
        };
        /** 转账给卖家 */
        const confirmTrans = yield requestReceive(
          order.sellerId, order.totalCost,
          `获得订单 #${order.id} 的收益`
        );
        yield order.update({
          sellerTransId: confirmTrans,
          status: 3
        });
        break;
      /** 申请退款 */
      case 'reqRefund':
        if (order.status != 2 && order.status != 3) {
          return res.fail({ type: 'INVALID_OP' })
        }
        // TODO:
        if (req.session.userId != order.buyerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        if (!validate(req.body.refundReason)) {
          throw new Error('Expect refundReason');
        }
        yield order.update({
          buyerText: req.body.refundReason,
          status: 4
        });
        break;
      /** 拒绝退款申请 */
      case 'refuseRefund':
        if (order.status != 4) {
          return res.fail({ type: 'INVALID_OP' })
        }
        if (req.session.userId != order.sellerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        if (!validate(req.body.refuseReason)) {
          throw new Error('Expect refuseReason');
        }
        yield order.update({
          sellerText: req.body.refuseReason,
          status: 6
        });
        const seller = yield User.findOne({where: {id: order.sellerId}})
        const buyer = yield User.findOne({where: {id: order.buyerId}})
        /** 发起仲裁 */
        yield Arbitration.create({
          userName: buyer.userName,
          complained: seller.userName,
          buyerText: order.buyerText,
          sellerText: order.sellerText,
          orderId: order.id,
          state: 'ing'
        })
        break;
      /** 同意退款申请 */
      case 'confirmRefund':
        if (order.status != 4) {
          return res.fail({ type: 'INVALID_OP' })
        }
        if (req.session.userId != order.sellerId) {
          return res.fail({ type: 'AUTH_FAIL' })
        }
        /** 处理退款 */
        const sellerRefund = yield requestPay(order.sellerId, order.totalCost, `订单 #${order.id} 退款`)
        const refundTrans = yield requestReceive(order.buyerId, order.totalCost, `订单 #${order.id} 退款`);
        yield order.update({
          status: 5,
          refundTransId: refundTrans,
          sellerRefundTransId: sellerRefund
        });
        break;
      /** 无效操作 */
      default:
        return res.fail({ type: 'INVALID_OP' })
    }
    return res.success(order);
  }
  catch (e) {
    return res.fail('in /order/update   ' + e.message);
  }
}));

/** 订单列表筛选 */
router.post('/order/order_list', Promise.coroutine(function* (req, res) {
  console.log('/order/order_list');
  console.log(req.body);
  try {
    if (validate(req.body.id)) {
      const order = yield Order.findOne({ where: { id: req.body.id } });
      return res.success({ orders: [order] });
    }
    /** 筛选条件 */
    let filter = { $or: [] };
    if (validate(req.body.sellerId)) {
      filter.$or.push({ sellerId: req.session.userId });
    }
    if (validate(req.body.buyerId)) {
      filter.$or.push({ buyerId: req.session.userId });
    }
    if (validate(req.body.filter)) {
      if (validate(req.body.filter.time)) {
        filter.createdAt = req.base.filter.time;
      }
      if (validate(req.body.filter.status)) {
        filter.status = req.body.filter.status;
      }
    }
    /** 筛选结果排列顺序 */
    let queryOrder = '';
    if (validate(req.body.base)) {
      queryOrder = req.body.base + ' ' + req.body.order;
    }
    const orders = yield Order.findAll({
      where: filter,
      order: queryOrder,
      offset: req.body.head,
      limit: req.body.length,
      include: [
        {
          model: Item
        }
      ]
    });

    return res.success({ orders: orders });
  }
  catch (e) {
    return res.fail('in /order/order_list   ' + require('util').inspect(e));
  }
}));

/** 获取商品评价 */
router.post('/item/review', Promise.coroutine(function* (req, res) {
  console.log('/item/review', req.body);
  try {
    const item = yield Item.findOne({ where: { id: req.body.itemId } });
    const reviews = yield item.getReviews();
    return res.success({ reviews: reviews });
  }
  catch (e) {
    return res.fail('in /item/review   ' + require('util').inspect(e));
  }
}));

/******************** Booking *******************/
router.get('/book/rooms', Promise.coroutine(function* (req, res) {
  if (!req.session.userId) { return res.status(403).fail(); }
  console.log('/book/rooms', req.body);
  try {
    const users = yield User.findAll({
      where: { booker: 1 },
      attributes: ['id', 'realName', 'address'],
      include: { model: Room }
    })
    return res.success({ users })
  } catch (e) {
    return res.fail('in /book/rooms   ' + require('util').inspect(e));
  }
}))

router.get('/book/my-rooms', Promise.coroutine(function* (req, res) {
  if (!req.session.userId) { return res.status(403).fail(); }
  console.log('/book/my-rooms', req.body);
  try {
    const user = yield User.findById(req.session.userId)
    const rooms = yield user.getRooms()
    return res.success({ rooms })
  } catch (e) {
    return res.fail('in /book/my-rooms   ' + require('util').inspect(e));
  }
}))

router.post('/book/add-room', Promise.coroutine(function* (req, res) {
  if (!req.session.userId) { return res.status(403).fail(); }
  console.log('/book/add-room', req.body);
  try {
    const newRoom = {
      userId: req.session.userId,
      name: req.body.name,
      description: req.body.description || '',
      price: req.body.price,
      disabled: 0
    }
    const room = yield Room.create(newRoom)
    return res.success({ room })
  } catch (e) {
    return res.fail('in /book/add-room   ' + require('util').inspect(e));
  }
}))

router.post('/book/update-room', Promise.coroutine(function* (req, res) {
  if (!req.session.userId) { return res.status(403).fail(); }
  try {
    const room = yield Room.findById(req.body.id)
    yield room.update({
      name: req.body.name,
      description: req.body.description || ''
    })
    return res.success()
  } catch (e) {
    return res.fail('in /book/update-room   ' + require('util').inspect(e));
  }
}))

router.post('/book/disable-room', Promise.coroutine(function* (req, res) {
  try {
    const room = yield Room.findById(req.body.id)
    yield room.update({ disabled: 1 })
    return res.success({ room })
  } catch (e) {
    return res.fail('in /book/disable-room   ' + require('util').inspect(e));
  }
}))

router.post('/book/enable-room', Promise.coroutine(function* (req, res) {
  try {
    const room = yield Room.findById(req.body.id)
    yield room.update({ disabled: 0 })
    return res.success({ room })
  } catch (e) {
    return res.fail('in /book/enable-room   ' + require('util').inspect(e));
  }
}))

router.post('/book/book-hotel', Promise.coroutine(function* (req, res) {
  try {
    const hotel = yield User.findById(req.body.uid)
    const room = yield Room.findById(req.body.id)
    const item = yield createItem(req.body.uid, {
      name: '[酒店预订]' + hotel.realName + room.name + ' ' + req.body.day + ' ' + '天',
      remain: 1,
      price: room.price * req.body.day,
      description: '[酒店预订]' + hotel.realName + room.name + ' ' + req.body.day + ' ' + '天',
      photo: []
    })
    const order = yield createOrder(req.session.userId, [
      { id: item.id, amount: 1 }
    ], '身份证：' + req.body.idNumber + '，真实姓名：' + req.body.realName)
    return res.success()
  } catch (e) {
    return res.fail('in /book/book-hotel   ' + require('util').inspect(e));
  }
}))

module.exports = router
