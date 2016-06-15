/** 商品页面提示登录框 */
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Link } from 'react-router';
import { Modal, Table, Button } from 'antd';

import { toggleLoginModal } from '../../redux/modules/shopping'
import styles from './styles';

@connect(
  (state) => ({
    showShoppingLoggingModal: state.shopping.showShoppingLoggingModal
  }),
  (dispatch) => ({
    toggleLoginModal: () => dispatch(toggleLoginModal()),
    redirectToLogin: () => {
      dispatch(push('/')),
      dispatch(toggleLoginModal())
    }
  })
)
class ShoppingLoggingModal extends React.Component {
  render() {
    return (
      <Modal title="登录 Blipay"
             visible={this.props.showShoppingLoggingModal}
             onCancel={this.props.toggleLoginModal}
             onText="立即登录"
             onOk={this.props.redirectToLogin}>
        <div className={styles.hint}>
          您还没有登录 Blipay，登录后才可以进行结算哦！
        </div>
      </Modal>
    )
  }
}

export default ShoppingLoggingModal
