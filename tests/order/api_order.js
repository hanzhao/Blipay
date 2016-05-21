const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/order');

proxy.use(router);

describe('POST /order/new', () => {
  const newOrder = {
    sellerId: 1,
    buyerId: 1,
    count: 2,
    cost: 46.63,
    items: [
      {
        itemId: 1,
        count: 1
      },
      {
        itemId: 2,
        count: 1
      }
    ]
  };
  const newOrderRes = {
    code: 0
  };
  it('returns code 0 if success', (done) => {
    request(proxy)
      .post('/order/new')
      .send(newOrder)
      .expect(newOrderRes)
      .expect(200, done);
  });
});



describe('POST /order/new', () => {
  const newOrder = {
    sellerId: 1,
    buyerId: 1,
    count: 2,
    cost: 33,
    items: [
      {
        itemId: 1,
        count: 1
      },
      {
        itemId: 2,
        count: 1
      }
    ]
  };
  const newOrder2 = {
    sellerId: 1,
    buyerId: 1,
    count: 3,
    cost: 44,
    items: [
      {
        itemId: 1,
        count: 2
      },
      {
        itemId: 2,
        count: 1
      }
    ]
  };
  const newOrderRes = {
    code: 0
  };
  it('returns code 0 if success', (done) => {
    request(proxy)
      .post('/order/new')
      .send(newOrder)
      .expect(newOrderRes)
      .expect(200, done);
  });
  it('returns code 0 if success', (done) => {
    request(proxy)
      .post('/order/new')
      .send(newOrder)
      .expect(newOrderRes)
      .expect(200, done);
  });
  it('returns code 0 if success', (done) => {
    request(proxy)
      .post('/order/new')
      .send(newOrder2)
      .expect(newOrderRes)
      .expect(200, done);
  });
});

describe('/order/update', () => {
  const orderreq = {
    orderId: 1,
    op: 'pay'
  };

  it('return code 0', (done) => {
    request(proxy)
      .post('/order/update')
      .send(orderreq)
      .expect({ code: 0 })
      .expect(200, done);
  });
});

describe('/order/order_list', () => {
  const id_req = {
    id: 1
  };
  const seller_req = {
    sellerId: 1
  };
  const buyer_req = {
    buyerId: 1
  };
  const filter_req = {
    base: 'cost',
    order: 'DESC'
  }
  it('id test return 0', (done) => {
    request(proxy)
      .post('/order/order_list')
      .send(id_req)
      .expect({ code: 0 })
      .expect(200, done);
  });
  it('seller test return 0', (done) => {
    request(proxy)
      .post('/order/order_list')
      .send(seller_req)
      .expect({ code: 0 })
      .expect(200, done);
  });
  it('buyer test return 0', (done) => {
    request(proxy)
      .post('/order/order_list')
      .send(buyer_req)
      .expect({ code: 0 })
      .expect(200, done);
  });
  it('filter test return 0', (done) => {
    request(proxy)
      .post('/order/order_list')
      .send(filter_req)
      .expect({ code: 0 })
      .expect(200, done);
  });
});
