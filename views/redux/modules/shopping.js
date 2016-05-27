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
const DELETE_CART_ITEM = 'Blipay/shopping/DELETE_CART_ITEM'
// 打开购物车模态框
const TOGGLE_SHOPPING_CART = 'Blipay/shopping/TOGGLE_SHOPPING_CART'
// 购买东西
const BUY_CART_ITEMS = 'Blipay/shopping/BUY_CART_ITEMS'
const BUY_CART_ITEMS_SUCCESS = 'Blipay/shopping/BUY_CART_ITEMS_SUCCESS'
const BUY_CART_ITEMS_FAIL = 'Blipay/shopping/BUY_CART_ITEMS_FAIL'
// 清空购物车
const CLEAR_SHOPPING_CART = 'Blipay/shopping/CLEAR_SHOPPING_CART'

// 订单页面各Modal
const TOGGLE_SHOPPING_REVIEW = 'Blipay/shopping/TOGGLE_SHOPPING_REVIEW'
const TOGGLE_SHOPPING_REFUND = 'Blipay/shopping/TOGGLE_SHOPPING_REFUND'
const TOGGLE_SHOPPING_REFUND_CONFIRM = 'Blipay/shopping/TOGGLE_SHOPPING_REFUND_CONFIRM'

// 获取订单信息
const LOAD_ORDERS = 'Blipay/shopping/LOAD_ORDERS'
const LOAD_ORDERS_SUCCESS = 'Blipay/shopping/LOAD_ORDERS_SUCCESS'
const LOAD_ORDERS_FAIL = 'Blipay/shopping/LOAD_ORDERS_FAIL'

// 付款
const PAY_ORDER = 'Blipay/shopping/PAY_ORDER'
const PAY_ORDER_SUCCESS = 'Blipay/shopping/PAY_ORDER_SUCCESS'
const PAY_ORDER_FAIL = 'Blipay/shopping/PAY_ORDER_FAIL'

// 发货
const SHIP_ORDER = 'Blipay/shopping/SHIP_ORDER'
const SHIP_ORDER_SUCCESS = 'Blipay/shopping/SHIP_ORDER_SUCCESS'
const SHIP_ORDER_FAIL = 'Blipay/shopping/SHIP_ORDER_FAIL'


// 确认收货及评价
const CONFIRM_RECEIVE = 'Blipay/shopping/CONFIRM_RECEIVE'
const CONFIRM_RECEIVE_SUCCESS = 'Blipay/shopping/CONFIRM_RECEIVE_SUCCESS'
const CONFIRM_RECEIVE_FAIL = 'Blipay/shopping/CONFIRM_RECEIVE_FAIL'

// 退货请求

const REFUND_REQ = 'Blipay/shopping/REFUND_REQ'
const REFUND_REQ_SUCCESS = 'Blipay/shopping/REFUND_REQ_SUCCESS'
const REFUND_REQ_FAIL = 'Blipay/shopping/REFUND_REQ_FAIL'


const messages = {
  NO_ITEM: '商品不存在',
  AUTH_FAIL: '权限不足',
  NO_ORDER: '订单不存在',
  INVALID_OP: '非法操作'
}

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

export const loadOrders = () => ({
  types: [LOAD_ORDERS, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAIL],
  promise: (client) => client.post('/api/order/order_list', { sellerId: true, buyerId: true })
})

export const addCartItem = (item) => ({
  type: ADD_CART_ITEM,
  item
})

export const deleteCartItem = (idx) => ({
  type: DELETE_CART_ITEM,
  idx
})

export const toggleShoppingCart = () => ({
  type: TOGGLE_SHOPPING_CART
})

export const toggleShoppingReview = (order) => ({
  type: TOGGLE_SHOPPING_REVIEW,
  order
})

export const toggleShoppingRefund = (orderId) => ({
  type: TOGGLE_SHOPPING_REFUND,
  orderId
})

export const toggleShoppingRefundConfirm = () => ({
  type: TOGGLE_SHOPPING_REFUND_CONFIRM
})

export const clearShoppingCart = () => ({
  type: CLEAR_SHOPPING_CART
})

export const buyCartItems = () => ({
  types: [BUY_CART_ITEMS, BUY_CART_ITEMS_SUCCESS, BUY_CART_ITEMS_FAIL],
  promise: (client) => client.post('/api/order/new', {
    items: store.getState().shopping.cartItems.map(e => ({
      id: e.id,
      amount: e.amount
    }))
  })
})

export const payOrder = (orderId) => ({
  types: [PAY_ORDER, PAY_ORDER_SUCCESS, PAY_ORDER_FAIL],
  promise: (client) => client.post('/api/order/update', {
    orderId: orderId,
    op: 'pay'
  })
})

export const ship_order = (orderId) => ({
  types: [SHIP_ORDER, SHIP_ORDER_SUCCESS, SHIP_ORDER_FAIL],
  promise: (client) => client.post('/api/order/update', {
    orderId: orderId,
    op: 'ship'
  })
})

export const confirmReceive = (orderId, reviews) => ({
  types: [CONFIRM_RECEIVE, CONFIRM_RECEIVE_SUCCESS, CONFIRM_RECEIVE_FAIL],
  promise: (client) => client.post('/api/order/update', {
    orderId: orderId,
    reviews: reviews,
    op: 'confirm'
  })
})

export const refundReq = (orderId, reason) => ({
  types: [REFUND_REQ, REFUND_REQ_SUCCESS, REFUND_REQ_FAIL],
  promise: (client) => client.post('/api/order/update', {
    orderId: orderId,
    refundReason: reason,
    op: 'reqRefund'
  })
})

const initialState = {
  cartItems: [],
  reviewItems: [],
  showReviewModal: false,
  showRefundModal: false,
  showRefundConfirmModal: false
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
    case TOGGLE_SHOPPING_REVIEW:
      return {
        ...state,
        showReviewModal: !state.showReviewModal,
        reviewOrder: action.order
      }
    case TOGGLE_SHOPPING_REFUND:
      return {
        ...state,
        showRefundModal: !state.showRefundModal,
        refundOrderId: action.orderId
      }
    case TOGGLE_SHOPPING_REFUND_CONFIRM:
      return {
        ...state,
        showRefundConfirmModal: !state.showRefundConfirmModal
      }
    case DELETE_CART_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems.slice(0, action.idx),
          ...state.cartItems.slice(action.idx + 1)],
        showShoppingCartModal: state.cartItems.length > 1
      }
    case BUY_CART_ITEMS_SUCCESS:
      message.success('订单生成成功')
      setTimeout(() => {
        store.dispatch(push(`/shopping/order`))
      }, 0)
      return {
        ...state,
        showShoppingCartModal: false,
        cartItems: []
      }
    case LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.result.orders
      }
    case CLEAR_SHOPPING_CART:
      return {
        ...state,
        cartItems: []
      }
    case PAY_ORDER_SUCCESS:
      message.success('订单支付成功')
      setTimeout(() => {
        store.dispatch(push(`/shopping/order`))
      }, 0)
      return {
        ...state
      }
    case SHIP_ORDER_SUCCESS:
      message.success('发货成功')
      setTimeout(() => {
        store.dispatch(push(`/shopping/order`))
      }, 0)
      return {
        ...state
      }
    case CONFIRM_RECEIVE_SUCCESS:
      message.success('收货成功')
      setTimeout(() => {
        store.dispatch(push(`/shopping/order`))
      }, 0)
      return {
        ...state,
        showReviewModal: !state.showReviewModal
      }
    case REFUND_REQ_SUCCESS:
      message.success('退货请求成功')
      return {
        ...state,
        showRefundModal: !state.showRefundModal
      }
    case ADD_ITEM_FAIL:
    case BUY_CART_ITEMS_FAIL:
    case LOAD_ITEM_FAIL:
    case LOAD_ITEMS_FAIL:
    case LOAD_ORDERS_FAIL:
    case SHIP_ORDER_FAIL:
    case CONFIRM_RECEIVE_FAIL:
    case REFUND_REQ_FAIL:
      message.error((action.error.type && messages[action.error.type]) || '未知错误')
      return {
        ...state
      }
    case PAY_ORDER_FAIL:
      message.error('余额不足')
      return {
        ...state
      }
    default:
      return state;
  }
}
