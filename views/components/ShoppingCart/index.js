import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button, message } from 'antd';
import classNames from 'classnames';

import ShoppingCartModal from '../ShoppingCartModal';
import {
  toggleShoppingCart,
  clearShoppingCart
} from '../../redux/modules/shopping';
import styles from './styles';
import ajax from '../../common/ajax';

const getTotalAmount = (items) => (
  items.map(e => e.amount).reduce((a, b) => a + b, 0)
)

const getTotalPrice = (items) => (
  items.map(e => e.price * e.amount).reduce((a, b) => a + b, 0)
)

@connect(
  (state) => ({
    cartItems: state.shopping.cartItems
  }),
  (dispatch) => ({
    toggleShoppingCart: () => dispatch(toggleShoppingCart()),
    clearShoppingCart: () => dispatch(clearShoppingCart())
  })
)
class ShoppingCart extends React.Component {
  handleSubmit = async function () {
    console.log(this.cartItems);
    const items = [];
    for (let i = 0; i < this.cartItems.length; i++) {
      let element = this.cartItems[i];
      items.push({
        itemId: element.id,
        count: element.amount
      });
    }
    const res = await ajax.post('/api/order/new', {
      sellerId: this.cartItems[0].seller.id,
      count: this.cartItems.length,
      cost: getTotalPrice(this.cartItems),
      items: items
    });
    if (res)
      this.clearAction();
      message.success('成功提交订单');
  };
  render() {
    const { cartItems } = this.props
    return (
      <div className={classNames({
        [styles.cart]: true,
        [styles.show]: cartItems.length > 0
      }) }>
        <ShoppingCartModal onCancel={this.props.toggleShoppingCart}
          footer={null} />
        <div className={styles.inner}>
          <span className={styles.cartIcon}
            onClick={this.props.toggleShoppingCart}>
            <Icon type="shopping-cart" />
            <span className={styles.counter}>
              { this.props.cartItems.length }
            </span>
          </span>
          <span className={styles.pricer}>
            {getTotalAmount(cartItems) } 件商品，
            总价：
            <span className={styles.price}>
              { getTotalPrice(cartItems) }
            </span>
          </span>
          <Button type="primary" cartItems={cartItems} onClick ={this.handleSubmit} clearAction={ this.props.clearShoppingCart }>
            结算
          </Button>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;
