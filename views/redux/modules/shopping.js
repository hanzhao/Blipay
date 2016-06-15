import store from '../store'
import { push } from 'react-router-redux'
import { message,Modal } from 'antd'
import io from 'socket.io-client';

let socket = null;

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
// 打开请求登录模态框
const TOGGLE_SHOPPING_LOGGING = 'Blipay/shopping/TOGGLE_SHOPPING_LOGGING'
// 购买东西
const BUY_CART_ITEMS = 'Blipay/shopping/BUY_CART_ITEMS'
const BUY_CART_ITEMS_SUCCESS = 'Blipay/shopping/BUY_CART_ITEMS_SUCCESS'
const BUY_CART_ITEMS_FAIL = 'Blipay/shopping/BUY_CART_ITEMS_FAIL'
// 清空购物车
const CLEAR_SHOPPING_CART = 'Blipay/shopping/CLEAR_SHOPPING_CART'

// 订单页面各Modal
const TOGGLE_SHOPPING_PAY = 'Blipay/shopping/TOGGLE_SHOPPING_PAY'
const TOGGLE_SHOPPING_SHIP = 'Blipay/shopping/TOGGLE_SHOPPING_SHIP'
const TOGGLE_SHOPPING_REVIEW = 'Blipay/shopping/TOGGLE_SHOPPING_REVIEW'
const TOGGLE_SHOPPING_REFUND = 'Blipay/shopping/TOGGLE_SHOPPING_REFUND'
const TOGGLE_SHOPPING_REFUND_CONFIRM = 'Blipay/shopping/TOGGLE_SHOPPING_REFUND_CONFIRM'
// 订单地址Modal
const TOGGLE_SHOPPING_ADDR = 'Blipay/shopping/TOGGLE_SHOPPING_ADDR'


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

// 退货处理
const REFUND_CONFIRM_SET_AGREE = 'Blipay/shopping/REFUND_CONFIRM_SET_AGREE'
const REFUND_CONFIRM_AGREE = 'Blipay/shopping/REFUND_CONFIRM_AGREE'
const REFUND_CONFIRM_AGREE_SUCCESS = 'Blipay/shopping/REFUND_CONFIRM_AGREE_SUCCESS'
const REFUND_CONFIRM_AGREE_FAIL = 'Blipay/shopping/REFUND_CONFIRM_AGREE_FAIL'
const REFUND_CONFIRM_REFUSE = '/Blipay/shopping/REFUND_CONFIRM_REFUSE'
const REFUND_CONFIRM_REFUSE_SUCCESS = '/Blipay/shopping/REFUND_CONFIRM_REFUSE_SUCCESS'
const REFUND_CONFIRM_REFUSE_FAIL = '/Blipay/shopping/REFUND_CONFIRM_REFUSE_FAIL'

// ChatModal
const TOGGLE_SHOPPING_CHAT = 'Blipay/shopping/TOGGLE_SHOPPING_CHAT'
const START_CHAT = 'Blipay/shopping/START_CHAT'
const UPDATE_USER_LIST = 'Blipay/shopping/UPDATE_USER_LIST'
const SEND_MSG = 'Blipay/shopping/SEND_MSG'
const RECV_MSG = 'Blipay/shopping/RECV_MSG'
const SELF_MSG = 'Blipay/shopping/SELF_MSG'
const CLEAR_NEW_MSG = 'Blipay/shopping/CLEAR_NEW_MSG'
const SELECT_CHATER = 'Blipay/shopping/SELECT_CHATER'
const TOGGLE_SHOPPING_SELLER = 'Blipay/shopping/TOGGLE_SHOPPING_SELLER'

// Booking
const LOAD_MY_ROOMS = 'Blipay/shopping/LOAD_MY_ROOMS'
const LOAD_MY_ROOMS_SUCCESS = 'Blipay/shopping/LOAD_MY_ROOMS_SUCCESS'
const LOAD_MY_ROOMS_FAIL = 'Blipay/shopping/LOAD_MY_ROOMS_FAIL'
const LOAD_ROOMS = 'Blipay/shopping/LOAD_ROOMS'
const LOAD_ROOMS_SUCCESS = 'Blipay/shopping/LOAD_ROOMS_SUCCESS'
const LOAD_ROOMS_FAIL = 'Blipay/shopping/LOAD_ROOMS_FAIL'
const ADD_ROOM = 'Blipay/shopping/ADD_ROOM'
const ADD_ROOM_SUCCESS = 'Blipay/shopping/ADD_ROOM_SUCCESS'
const ADD_ROOM_FAIL = 'Blipay/shopping/ADD_ROOM_FAIL'
const UPDATE_ROOM = 'Blipay/shopping/UPDATE_ROOM'
const UPDATE_ROOM_SUCCESS = 'Blipay/shopping/UPDATE_ROOM_SUCCESS'
const UPDATE_ROOM_FAIL = 'Blipay/shopping/UPDATE_ROOM_FAIL'
const DISABLE_ROOM = 'Blipay/shopping/DISABLE_ROOM'
const DISABLE_ROOM_SUCCESS = 'Blipay/shopping/DISABLE_ROOM_SUCCESS'
const DISABLE_ROOM_FAIL = 'Blipay/shopping/DISABLE_ROOM_FAIL'
const ENABLE_ROOM = 'Blipay/shopping/ENABLE_ROOM'
const ENABLE_ROOM_SUCCESS = 'Blipay/shopping/ENABLE_ROOM_SUCCESS'
const ENABLE_ROOM_FAIL = 'Blipay/shopping/ENABLE_ROOM_FAIL'
const TOGGLE_BOOK_MODAL = 'Blipay/shopping/TOGGLE_BOOK_MODAL'
const BOOK_HOTEL = 'Blipay/shopping/BOOK_HOTEL'
const BOOK_HOTEL_SUCCESS = 'Blipay/shopping/BOOK_HOTEL_SUCCESS'
const BOOK_HOTEL_FAIL = 'Blipay/shopping/BOOK_HOTEL_FAIL'



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

export const toggleShoppingPay = (order) => ({
  type: TOGGLE_SHOPPING_PAY,
  order
})

export const toggleShoppingShip = (order) => ({
  type: TOGGLE_SHOPPING_SHIP,
  order
})

export const toggleShoppingCart = () => ({
  type: TOGGLE_SHOPPING_CART
})

export const toggleLoginModal = () => ({
  type: TOGGLE_SHOPPING_LOGGING
})

export const toggleShoppingReview = (order) => ({
  type: TOGGLE_SHOPPING_REVIEW,
  order
})

export const toggleShoppingRefund = (orderId) => ({
  type: TOGGLE_SHOPPING_REFUND,
  orderId
})

export const toggleShoppingRefundConfirm = (order) => ({
  type: TOGGLE_SHOPPING_REFUND_CONFIRM,
  order
})

export const toggleShoppingAddr = () => ({
  type: TOGGLE_SHOPPING_ADDR
})

export const toggleShoppingChat = () => ({
  type: TOGGLE_SHOPPING_CHAT
})

export const clearShoppingCart = () => ({
  type: CLEAR_SHOPPING_CART
})

export const buyCartItems = (addr) => ({
  types: [BUY_CART_ITEMS, BUY_CART_ITEMS_SUCCESS, BUY_CART_ITEMS_FAIL],
  promise: (client) => client.post('/api/order/new', {
    items: store.getState().shopping.cartItems.map(e => ({
      id: e.id,
      amount: e.amount
    })),
    addr: addr
  })
})

export const payOrder = (orderId) => ({
  types: [PAY_ORDER, PAY_ORDER_SUCCESS, PAY_ORDER_FAIL],
  promise: (client) => client.post('/api/order/update', {
    orderId: orderId,
    op: 'pay'
  })
})

export const shipOrder = (orderId) => ({
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

export const refundConfirmSetAgree = (agree) => ({
  type: REFUND_CONFIRM_SET_AGREE,
  agree
})

export const refundConfirmAgree = (orderId) => ({
  types: [REFUND_CONFIRM_AGREE, REFUND_CONFIRM_AGREE_SUCCESS, REFUND_CONFIRM_AGREE_FAIL],
  promise: (client) => client.post('/api/order/update', {
    orderId: orderId,
    op: 'confirmRefund'
  })
})

export const refundConfirmRefuse = (orderId, reason) => ({
  types: [REFUND_CONFIRM_REFUSE, REFUND_CONFIRM_REFUSE_SUCCESS, REFUND_CONFIRM_AGREE_FAIL],
  promise: (client) => client.post('/api/order/update', {
    orderId: orderId,
    op: 'refuseRefund',
    refuseReason: reason
  })
})

export const sendMsg = (text) => ({
  type: SEND_MSG,
  text
})

export const updateUserList = (users) => ({
  type: UPDATE_USER_LIST,
  users
})

export const recvMsg = (data) => ({
  type: RECV_MSG,
  data
})

export const selfMsg = (data) => ({
  type: SELF_MSG,
  data
})

export const clearNewMsg = (data) => ({
  type: CLEAR_NEW_MSG
})

export const selectChater = (userId) => ({
  type: SELECT_CHATER,
  userId
})

export const toggleSeller = (userId) => ({
  type: TOGGLE_SHOPPING_SELLER,
  userId
})

export const startChat = () => {

  if (!socket) {
    socket = io.connect(`${location.protocol}//${location.host}`);
    socket.on('connected', () => {
      socket.emit('reqUserList')
    })

    socket.on('userList', (data) => {
      console.log(data.users)
      store.dispatch(updateUserList(data.users))
    })

    socket.on('msg', (data) => {
      console.log('Recv Msg\t' + JSON.stringify(data))
      store.dispatch(recvMsg(data))
    })
  }
  return {
    type: START_CHAT
  }
}

/***** Booking *****/
export const loadMyRooms = () => ({
  types: [LOAD_MY_ROOMS, LOAD_MY_ROOMS_SUCCESS, LOAD_MY_ROOMS_FAIL],
  promise: (client) => client.get('/api/book/my-rooms')
})

export const addRoom = (data) => ({
  types: [ADD_ROOM, ADD_ROOM_SUCCESS, ADD_ROOM_FAIL],
  promise: (client) => client.post('/api/book/add-room', data)
})

export const loadRooms = () => ({
  types: [LOAD_ROOMS, LOAD_ROOMS_SUCCESS, LOAD_ROOMS_FAIL],
  promise: (client) => client.get('/api/book/rooms')
})

export const setRoomEnabled = (data) => ({
  types: [ENABLE_ROOM, ENABLE_ROOM_SUCCESS, ENABLE_ROOM_FAIL],
  promise: (client) => client.post('/api/book/enable-room', data)
})

export const setRoomDisabled = (data) => ({
  types: [DISABLE_ROOM, DISABLE_ROOM_SUCCESS, DISABLE_ROOM_FAIL],
  promise: (client) => client.post('/api/book/disable-room', data)
})

export const toggleBookModal = (e) => ({
  type: TOGGLE_BOOK_MODAL,
  data: e
})

export const bookHotel = (data) => {
  data.day = Math.floor((Number(data.date[1]) - Number(data.date[0])) / 86400000)
  console.log(data)
  return {
    types: [BOOK_HOTEL, BOOK_HOTEL_SUCCESS, BOOK_HOTEL_FAIL],
    promise: (client) => client.post('/api/book/book-hotel', data)
  }
}

const initialState = {
  cartItems: [],
  reviewItems: [],
  chatUsers: [],
  listUsers: [],
  chatMsgs: new Object(),
  showPayModal: false,
  showShipModal: false,
  showReviewModal: false,
  showRefundModal: false,
  showRefundConfirmModal: false,
  showAddressModal: false,
  showChatModal: false,
  refundConfirmAgree: true,
  newMsg: 0
}

function clone(myObj) {
  if (typeof (myObj) != 'object') return myObj;
  if (myObj == null) return myObj;

  var myNewObj = new Object();

  for (var i in myObj)
    myNewObj[i] = myObj[i];

  return myNewObj;
}

function cloneArray(myObj) {
  if (typeof (myObj) != 'object') return myObj;
  if (myObj == null) return myObj;

  var myNewObj = new Array();

  for (var i in myObj)
    myNewObj[i] = myObj[i];

  return myNewObj;
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
    case TOGGLE_SHOPPING_LOGGING:
      return {
        ...state,
        showShoppingCartModal: true,
        showShoppingLoggingModal: !state.showShoppingLoggingModal
      }
    case TOGGLE_SHOPPING_PAY:
      return {
        ...state,
        showPayModal: !state.showPayModal,
        payOrder: action.order
      }
    case TOGGLE_SHOPPING_SHIP:
      return {
        ...state,
        showShipModal: !state.showShipModal,
        shipOrder: action.order
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
        showRefundConfirmModal: !state.showRefundConfirmModal,
        refundConfirmOrder: action.order
      }
    case TOGGLE_SHOPPING_ADDR:
      return {
        ...state,
        showAddressModal: !state.showAddressModal
      }
    case TOGGLE_SHOPPING_CHAT:
      return {
        ...state,
        showChatModal: !state.showChatModal,
        newMsg: state.showChatModal ? state.newMsg : 0
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
      // message.success('订单支付成功')
      Modal.success({
        title: '订单支付成功！',
        onCancel() { },
      })
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
      setTimeout(() => {
        store.dispatch(push(`/shopping/order`))
      }, 0)
      return {
        ...state,
        showRefundModal: !state.showRefundModal
      }
    case REFUND_CONFIRM_SET_AGREE:
      return {
        ...state,
        refundConfirmAgree: action.agree
      }
    case REFUND_CONFIRM_AGREE_SUCCESS:
      message.success('退货操作成功，请检查')
      setTimeout(() => {
        store.dispatch(push(`/shopping/order`))
      }, 0)
      return {
        ...state,
        showRefundConfirmModal: false
      }
    case REFUND_CONFIRM_REFUSE_SUCCESS:
      message.success('拒绝退款，提交仲裁')
      setTimeout(() => {
        store.dispatch(push(`/shopping/order`))
      }, 0)
      return {
        ...state,
        showRefundConfirmModal: false
      }
    /* Start Chat Conn after User login */
    case START_CHAT:
      console.log(socket)
      return {
        ...state,
        socket: action.socket
      }
    /* Send message to server with target user */
    case SEND_MSG:
      socket.emit('send', { userId: state.chaterId, text: action.text })
      return {
        ...state
      }
    /* Update User list from server */
    case UPDATE_USER_LIST:
      return {
        ...state,
        chatUsers: action.users
      }
    /* Recieved message from server */
    case RECV_MSG:
      let recv_data = action.data
      let recv_chatMsgs = clone(state.chatMsgs)
      /* First time recieve */
      if (!recv_chatMsgs[recv_data.from])
        recv_chatMsgs[recv_data.from] = new Array();
      /* push message */
      recv_chatMsgs[recv_data.from].push(recv_data);
      /* Set user new message flag */
      if (state.chaterId != recv_data.from)
        state.chatUsers[recv_data.from].newMsg = true;
      const recvListUsers = cloneArray(state.listUsers)
      /* Refresh state */
      recvListUsers[recv_data.from] = state.chatUsers[recv_data.from]
      let newMsg = state.newMsg
      /* Increase Badge number */
      if(!state.showChatModal)
        newMsg++
      return {
        ...state,
        chatMsgs: recv_chatMsgs,
        listUsers: recvListUsers,
        newMsg: newMsg
      }
    /* triggered when send messages */
    case SELF_MSG:
      let self_data = action.data;
      let self_chatMsgs = clone(state.chatMsgs);
      /* First time? */
      if (!self_chatMsgs[self_data.to])
        self_chatMsgs[self_data.to] = new Array();
      /* use 'to' to mark as sender( different style ) */
      self_chatMsgs[self_data.to].push(self_data)
      return {
        ...state,
        chatMsgs: self_chatMsgs
      }
    case CLEAR_NEW_MSG:
      return {
        ...state,
        newMsg: 0
      }
    /* Click on user list */
    case SELECT_CHATER:
      const newChatUsers = cloneArray(state.chatUsers);
      /* clear new message flag on user */
      newChatUsers[action.userId].newMsg = false;
      return {
        ...state,
        chatUsers: newChatUsers,
        chaterId: action.userId
      }
    /* Click Seller */
    case TOGGLE_SHOPPING_SELLER:
      const sellerId = action.userId
      if (!state.chatUsers[sellerId]) {
        message.error('该卖家未上线')
        return {
          ...state
        }
      }
      const newListUsers = cloneArray(state.listUsers)
      newListUsers[sellerId] = state.chatUsers[sellerId]
      return {
       ...state,
        chaterId: sellerId,
        listUsers: newListUsers,
        showChatModal: true
      }
    /********** Booking ************/
    case LOAD_MY_ROOMS_SUCCESS:
      return {
        ...state,
        myRooms: action.result.rooms
      }
    case ADD_ROOM_SUCCESS:
      message.success('添加成功')
      setTimeout(() => {
        store.dispatch(push(`/shopping/manage_room`))
      }, 0)
      return {
        ...state
      }
    case DISABLE_ROOM_SUCCESS:
    case ENABLE_ROOM_SUCCESS:
      message.success('操作成功')
      let updated = action.result.room
      let index = _.findIndex(state.myRooms, ['id', updated.id])
      return {
        ...state,
        myRooms: [...state.myRooms.slice(0, index),
                         { ...state.myRooms[index], ...updated },
                         ...state.myRooms.slice(index + 1)]
      }
    case LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        hotels: action.result.users
      }
    case TOGGLE_BOOK_MODAL:
      return {
        ...state,
        showBookModal: !state.showBookModal,
        _t_: action.data
      }
    case ADD_ROOM_FAIL:
    case LOAD_MY_ROOMS_FAIL:

    case ADD_ITEM_FAIL:
    case BUY_CART_ITEMS_FAIL:
    case LOAD_ITEM_FAIL:
    case LOAD_ITEMS_FAIL:
    case LOAD_ORDERS_FAIL:
    case SHIP_ORDER_FAIL:
    case CONFIRM_RECEIVE_FAIL:
    case REFUND_REQ_FAIL:
    case REFUND_CONFIRM_AGREE_FAIL:
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
