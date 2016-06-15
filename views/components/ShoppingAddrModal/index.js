/** 支付订单选择地址 */
import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Modal, Input, message, Cascader, Row, Col } from 'antd';
import store from '../../redux/store';
import { buyCartItems, toggleShoppingAddr } from '../../redux/modules/shopping';
import { reduxForm } from 'redux-form';

import { towns } from '../../common/cascaders'

@connect(
  (state) => ({
    showShoppingAddrModal: state.shopping.showAddressModal
  }),
  (dispatch) => ({
    buyCartItems: (addr) => dispatch(buyCartItems(addr)),
    toggleShoppingAddr: () => dispatch(toggleShoppingAddr())
  })
)
@reduxForm(
  {
    form: 'orderAddress',
    fields: ['city','addr']
  }, undefined, {
    onSubmit: (data) => { }
  })
class AddressModal extends React.Component {
  render() {
    const { fields: { city, addr },
      buyCartItems, showShoppingAddrModal, toggleShoppingAddr } = this.props;
    const submit = () => {
      if (!city.value) {
        message.error('请选择地区')
      } else if (!addr.value) {
        message.error('请填写具体地址')
      } else {
        buyCartItems(city.value.reduce((a, b) => (a + b)) + addr.value)
        toggleShoppingAddr()
      }
    }
    return (
      <Modal title="地址"
        visible={showShoppingAddrModal}
        onCancel={toggleShoppingAddr}
        onOk={submit}>
        <div>
          <Row>
            <Col span="6" offset="3">
              所在城市：
            </Col>
            <Col span="12">
              <Cascader style={{ width: 180, marginBottom: 10 }} options={towns.provs} placeholder="请选择地区" {...city} />
            </Col>
          </Row>
          <Row>
            <Col span="6" offset="3">
              具体地址：
            </Col>
            <Col span="12">
              <Input placeholder="请输入具体地址" {...addr}/>
            </Col>
          </Row>
        </div>
      </Modal>
    )
  }
}

export default AddressModal
