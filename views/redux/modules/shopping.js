import store from '../store'
import { push } from 'react-router-redux'
import { message } from 'antd'

// Action 表
// 添加新商品
const ADD_ITEM = 'Blipay/shopping/ADD_ITEM'
const ADD_ITEM_SUCCESS = 'Blipay/shopping/ADD_ITEM_SUCCESS'
const ADD_ITEM_FAIL = 'Blipay/shopping/ADD_ITEM_FAIL'
// 获得商品信息
const LOAD_ITEM = 'Blipay/shopping/LOAD_ITEM'
const LOAD_ITEM_SUCCESS = 'Blipay/shopping/LOAD_ITEM_SUCCESS'
const LOAD_ITEM_FAIL = 'Blipay/shopping/LOAD_ITEM_FAIL'
const LOAD_ITEMS = 'Blipay/shopping/LOAD_ITEMS'
const LOAD_ITEMS_SUCCESS = 'Blipay/shopping/LOAD_ITEMS_SUCCESS'
const LOAD_ITEMS_FAIL = 'Blipay/shopping/LOAD_ITEMS_FAIL'
// 添加物品进购物车
const ADD_CART_ITEM = 'Blipay/shopping/ADD_CART_ITEM'
// 打开购物车模态框
const TOGGLE_SHOPPING_CART = 'Blipay/shopping/TOGGLE_SHOPPING_CART'
// delete all items
const CLEAR_SHOPPING_CART = 'Blipay/shopping/CLEAR_SHOPPING_CART'

// Action Creators
export const addItem = (data) => ({
  types: [ADD_ITEM, ADD_ITEM_SUCCESS, ADD_ITEM_FAIL],
  promise: (client) => client.post('/api/item/new', {
    ...data,
    photo: data.photo.map(e => e.response.data.attachmentId)
  })
})

export const loadItem = (id) => ({
  types: [LOAD_ITEM, LOAD_ITEM_SUCCESS, LOAD_ITEM_FAIL],
  promise: (client) => client.get('/api/item/show', { id })
})

export const loadItems = () => ({
  types: [LOAD_ITEMS, LOAD_ITEMS_SUCCESS, LOAD_ITEMS_FAIL],
  promise: (client) => client.get('/api/items')
})

export const addCartItem = (item) => ({
  type: ADD_CART_ITEM,
  item
})

export const toggleShoppingCart = () => ({
  type: TOGGLE_SHOPPING_CART
})

export const clearShoppingCart = () => ({
  type: CLEAR_SHOPPING_CART
})

const initialState = {
  cartItems: []
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_ITEM_SUCCESS:
      message.success('商品添加成功')
      setTimeout(() => {
        store.dispatch(push(`/shopping/item/${action.result.id}`))
      }, 0)
      return state;
    case LOAD_ITEM_SUCCESS:
      return {
        ...state,
        item: action.result.item
      }
    case LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.result.items
      }
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.item]
      }
    case TOGGLE_SHOPPING_CART:
      return {
        ...state,
        showShoppingCartModal: !state.showShoppingCartModal
      }
    case CLEAR_SHOPPING_CART:
      return {
        cartItems: []
      }
    default:
      return state;
  }
}
