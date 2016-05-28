import React from 'react';
import { connect } from 'react-redux';
import { Modal, Table } from 'antd';

import styles from './styles';

const columns = [{
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
}]

const getTotalPrice = (items) => (
  items.map(e => e.price * e.amount).reduce((a, b) => a + b, 0)
)

@connect(
  (state) => ({
    cartItems: state.shopping.cartItems.map((e, i) => ({ ...e, key: i })),
    showShoppingCartModal: state.shopping.showShoppingCartModal
  })
)
class ShoppingCartModal extends React.Component {
  render() {
    return (
      <Modal title="购物车"
             visible={this.props.showShoppingCartModal}
             {...this.props}>
        <Table dataSource={this.props.cartItems}
               columns={columns}
               pagination={false} />
        <div className={styles.total}>
          总计：¥{ getTotalPrice(this.props.cartItems).toFixed(2) }
        </div>
      </Modal>
    )
  }
}

export default ShoppingCartModal
