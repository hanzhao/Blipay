const request = require('supertest');
const proxy = require('../helper');
const router = require('../../controllers/order');
const createItem = require("../../controllers/services/order").createItem;

proxy.use(router);

describe('POST /item/new', () => {
  const newItem = {
    name: 'testItem',
    price: 23.32,
    remain: 1,
    thumb: "a.com/a"
  };
  const newItemRes = {
    code: 0
  };
  const listItem = {
    name: 'listtestItem',
    price: 23.31,
    remain: 11,
    thumb: "a.com/a"
  };

  it('returns code 0 if success', (done) => {
    request(proxy)
      .post('/item/new')
      .send(newItem)
      .expect(newItemRes)
      .expect(200, done);
  });

  it('returns code 0 if success', (done) => {
    request(proxy)
      .post('/item/new')
      .send(listItem)
      .expect(newItemRes)
      .expect(200, done);
  })

});

describe('POST /item/item_list', () => {
  const listItem = {
    name: 'listtestItem',
    price: 23.31,
    remain: 11,
    thumb: "a.com/a"
  };
  const newItem = {
    name: 'testItem',
    price: 23.32,
    remain: 1,
    thumb: "a.com/a"
  };
  const id_query = {
    id: 2
  }

  const filter_query = {
    filter:{
    price: {
      $gt: 10,
      $lt: 33
    },
    remain: {
      $gt: 0
    },
    time: {
      $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
    }

    }
  }
  // beforeEach(() => {
  //   console.log('before itemList');
  //   return createItem(1, listItem);
  // });
  it('return itemList', (done) => {
    request(proxy)
    .post('/item/item_list')
    .send(id_query)
    .expect({items: [listItem]})
    .expect(200, done);
  });
  it('return itemList', (done) => {
    request(proxy)
    .post('/item/item_list')
    .send(filter_query)
    .expect({items: [newItem, listItem]})
    .expect(200, done);
  });
})
