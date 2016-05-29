import React from 'react';
import { connect } from 'react-redux';
import { Modal, Table, Button } from 'antd';

import { deleteCartItem, buyCartItems, toggleLoginModal } from '../../redux/modules/shopping';
import store from '../../redux/store';
import styles from './styles';

const deleteItem = (id) => {
  store.dispatch(deleteCartItem(id))
}

const columns = [{
  title: ' ',
  dataIndex: 'attachments',
  key: 'attachments',
  render(text) {
    return (
      <img className={styles.itemAvatar} src={`/api/photo/show?id=${text[0].id}`} />
    )
  }
}, {
  title: '商品名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '数量',
  dataIndex: 'amount',
  key: 'amount',
}, {
  title: '单价',
  dataIndex: 'price',
  key: 'price',
  render(text) {
    return (
      <span>{ text.toFixed(2) }</span>
    )
  }
}, {
  title: '总价',
  dataIndex: 'price',
  key: 'totalPrice',
  render(text, record) {
    return (
      <span>{ (record.amount * record.price).toFixed(2) }</span>
    )
  }
}, {
  title: ' ',
  dataIndex: 'id',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <Button onClick={deleteItem.bind(this, record.key)}>
          删除
        </Button>
      </span>
    )
  }
}]

const getTotalPrice = (items) => (
  items.map(e => e.price * e.amount).reduce((a, b) => a + b, 0)
)

@connect(
  (state) => ({
    cartItems: state.shopping.cartItems.map((e, i) => ({ ...e, key: i })),
    showShoppingCartModal: state.shopping.showShoppingCartModal,
    user: state.account.user
  }),
  (dispatch) => ({
    buyCartItems: () => dispatch(buyCartItems()),
    toggleLoginModal: () => dispatch(toggleLoginModal())
  })
)
class ShoppingCartModal extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Modal title="购物车"
             visible={this.props.showShoppingCartModal}
             className={styles.modal}
             {...this.props}>
        <Table dataSource={this.props.cartItems}
               columns={columns}
               pagination={false} />
        <div className={styles.total}>
          总计：¥{ getTotalPrice(this.props.cartItems).toFixed(2) }
          <Button type="primary" className={styles.btn}
                  onClick={user ? this.props.buyCartItems : this.props.toggleLoginModal}>
            马上结算
          </Button>
        </div>
      </Modal>
    )
  }
}

export default ShoppingCartModal
