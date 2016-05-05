import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Pagination } from 'antd';
import pic from './akarin.png'
class ShoppingOrderPage extends React.Component {
  render() {
    return (
   		<div>
   			<hr />
   			<p>单价</p>
   			<p>数量</p>
   			<p>订单编号</p>
   			<p>订单金额</p>
   			<p>订单状态</p>
   			<hr />
   			 <img src={pic} /> <p> akarin </p> <p>400.00$</p> <p>2</p> <p>09090909090</p>
   			 <p>800.00$</p>
   			  <Button type="ghost">确认付款</Button>
   			<hr/>
   			<Pagination defaultCurrent={1} total={500} />
    	</div>
    );
  }
}

export default ShoppingOrderPage;
