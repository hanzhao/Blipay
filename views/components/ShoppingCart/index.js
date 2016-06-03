import React from 'react';
import { connect } from 'react-redux';
import { Icon, Button, message } from 'antd';
import classNames from 'classnames';

import ShoppingCartModal from '../ShoppingCartModal';
import ChatModal from '../ChatModal';
import Container from '../Container';
import {
  toggleShoppingCart,
  toggleShoppingChat,
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
    cartItems: state.shopping.cartItems,
    showShoppingCartModal: state.shopping.showShoppingCartModal
  }),
  (dispatch) => ({
    toggleShoppingCart: () => dispatch(toggleShoppingCart()),
    toggleShoppingChat: () => dispatch(toggleShoppingChat()),
    clearShoppingCart: () => dispatch(clearShoppingCart())
  })
)
class ShoppingCart extends React.Component {
  render() {
    const { cartItems } = this.props
    return (
      <div className={classNames({
        [styles.cart]: true,
        [styles.show]: true && !this.props.showShoppingCartModal
      }) }>
        <ChatModal/>
        <Button onClick={this.props.toggleShoppingChat}/>
        <ShoppingCartModal onCancel={this.props.toggleShoppingCart}
          footer={null} />
        <Container>
          <div className={styles.inner}>
            {/* <span className={styles.pricer}>
              { getTotalAmount(cartItems) } 件商品，
              一共 <span className={styles.price}>
                { getTotalPrice(cartItems).toFixed(2) }
              </span> 元
            </span> */}
            <span className={styles.cartIcon}
              onClick={this.props.toggleShoppingCart}>
              <Icon type="shopping-cart" />
              <span className={styles.counter}>
                { this.props.cartItems.length }
              </span>
              <span className={styles.viewCart}>
                查看购物车
              </span>
            </span>
          </div>
        </Container>
      </div>
    )
  }
}

export default ShoppingCart;
