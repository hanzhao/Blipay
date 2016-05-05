import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Pagination } from 'antd';
import pic from './akarin.png'
function onChangeCheckBox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function onChangeInput(value) {
  console.log('changed', value);
}
class ShoppingCartPage extends React.Component {
  render() {
    return (
   	<div>
       <hr/>
       <Checkbox defaultChecked={false} onChange={onChangeCheckBox} />
        <img src={pic} /> <p> akarin </p>
       <InputNumber min={1} max={1024} defaultValue={3} onChange={onChangeInput} />
       <p>12450$</p>
        <hr/>
        <Button type="ghost">全选 </Button>
        <Button type="ghost">删除 </Button>
        <p>总价</p>
        <h1>$12450.00</h1>
        <Button type="primary" size="large">结算</Button>
        <Pagination defaultCurrent={1} total={500} />
    </div>
    );
  }
}

export default ShoppingCartPage;