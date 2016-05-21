import React from 'react';
import { Menu, Dropdown, Icon, Form } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Pagination } from 'antd';
import pic from './akarin.png'
import styles from './styles';
import FormModal from '../FormModal';
import { Table } from 'antd';
import { Cascader } from 'antd';
import { reduxForm } from 'redux-form';
import ajax from '../../common/ajax';
const createForm = Form.create;
const FormItem = Form.Item;
let contents = [];
let tableProps = 
{
  pagination: 
  {
    simple: true,
    pageSize: 6
  }
};
let columns = [{
      title: '',
      dataIndex: 'thumb',
      key: 'thumb',
      render: (d,e) => {
        return <img src={e.items[0].thumb}  className={styles.itemImage}/>
      }
    }, {
      title: '宝贝',
      dataIndex: 'name',
      key: 'name',
      render: (d,e) => {
           return <span className={styles.itemName}>{e.items[0].name}</span>;   
      }
    }, {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (d,e) => {
           return <span className={styles.itemPrice}>{Number(e.items[0].price).toFixed(2)}</span>;   
      }
    }, {
      title: '数量',
      dataIndex: 'count',
      key: 'count'
    }, {
      title: '订单编号',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '订单金额',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (d) => {
           return <span className={styles.itemTotalCost}>{Number(d).toFixed(2)}</span>;   
      }
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (d) => {
        return <Button type="ghost">确认付款</Button>
      }
    }];

let BasicDemo = React.createClass(
{
      getInitialState: async ()=> {
      const res = await ajax.post('/order/order_list',{buyerId:1});
      console.log('buyresult',res);
      Object.assign(contents,res.orders);
      //console.log(contents);
      return {};
    },
    render() {    
      const pagination = {
        total: contents.length,
        showSizeChanger: true,
        pageSize:2,
        onShowSizeChange(current, pageSize) {
          console.log('Current: ', current, '; PageSize: ', pageSize);
        },
        onChange(current) {
          console.log('Current: ', current);
        },
      };
      return(
        <Table columns={columns} dataSource={contents} pagination={pagination} />
      );
    }
});



class ShoppingOrderPage extends React.Component {
    render() 
    {
      return (
        <BasicDemo />
      );
    }
}
BasicDemo = createForm()(BasicDemo);
export default ShoppingOrderPage;
