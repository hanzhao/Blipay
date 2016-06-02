import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Modal, Input, message, Cascader } from 'antd';
import store from '../../redux/store';
import cities from './cityData'
import { buyCartItems, toggleShoppingAddr } from '../../redux/modules/shopping';
import { reduxForm } from 'redux-form';

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
    const { fields: {city,addr}, buyCartItems, showShoppingAddrModal, toggleShoppingAddr } = this.props;
    const submit = () => {
      if(city.value==''){
        message.error('请选择地区！')
      }
      else{
        console.log(city.value.reduce((a,b)=>(a+b))+addr.value)
        buyCartItems(city.value.reduce((a,b)=>(a+b))+addr.value)
        toggleShoppingAddr()
      }
    } 
    return (
      <Modal title="地址"
        visible={showShoppingAddrModal}
        onCancel={toggleShoppingAddr}
        onOk={submit}>
        <Cascader style={{ width: 300 }} size="large" options={cities.provs} placeholder="请选择地区" {...city} />
        <Input label="具体地址" {...addr}/>
      </Modal>
    )
  }
}

export default AddressModal