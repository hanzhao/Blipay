import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button } from 'antd';
import classNames from 'classnames';

import ShoppingCartModal from '../ShoppingCartModal';
import {
  toggleShoppingCart
} from '../../redux/modules/shopping';
import styles from './styles';

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
    toggleShoppingCart: () => dispatch(toggleShoppingCart())
  })
)
class ShoppingCart extends React.Component {
  render() {
    const { cartItems } = this.props
    return (
      <div className={classNames({
        [styles.cart]: true,
        [styles.show]: cartItems.length > 0
      })}>
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
            {getTotalAmount(cartItems)} 件商品，
            总价：
            <span className={styles.price}>
              { getTotalPrice(cartItems) }
            </span>
          </span>
          <Button type="primary">
            结算
          </Button>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;
