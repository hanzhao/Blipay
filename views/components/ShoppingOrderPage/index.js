import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Pagination } from 'antd';
import pic from './akarin.png'
import styles from './styles';
import FormModal from '../FormModal';


import { Table } from 'antd';

const topupPropsArray = [
  {
    input: {
      placeholder: '请输入支付密码',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'card', {
        rules: [{ required: true}]
      }
    ]
  },
  {
    input: {
      placeholder: '请确认支付密码',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'amount', {
        rules: [{ required: true }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'password', {
        rules: [{ required: true }]
      }
    ]
  }
];


class ShoppingOrderPage extends React.Component {
    state = {
    showTopup: false,
    showWithdrawal: false
  };
    toggleTopup = () => {
    this.setState({
      showTopup: !this.state.showTopup
    });
  };
  toggleWithDrawal = () => {
    this.setState({
      showWithdrawal: !this.state.showWithdrawal
    });
  };

  render() {

    const contents = Array(10).fill({
        productImage: pic,
        productName: 'Tesla',
        price: 100,
        amount: 2,
        orderID: '09090909090',
        totalCost: 200,
        status:0
    });

  const columns = [{
      title: '宝贝',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (d) => {
        return <img src={d} />
      }
    }, {
      title: '宝贝名称',
      dataIndex: 'productName',
      key: 'productName'
    }, {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    }, {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount'
    }, {
      title: '订单编号',
      dataIndex: 'orderID',
      key: 'orderID'
    }, {
      title: '订单金额',
      dataIndex: 'totalCost',
      key: 'totalCost'
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (d) => {
        return <Button type="ghost" onClick={this.toggleTopup} >确认付款</Button>
      }
    }];

  const wrapperForOrderTable = (data) => {
      for ( var i = 0; i <  data.length; i++ ) { 
        data[i].price = Number(data[i].price).toFixed(2);
      }
      return data;
  };

  const tableProps = {
    pagination: {
      simple: true,
      pageSize: Math.floor((window.innerHeight - 350) / 50)
    }
  };

    return (
    <div className={styles.container}>
          <Table columns={columns} dataSource={wrapperForOrderTable(contents)} {...tableProps} />
        <br/>
        <br/>
        <FormModal title="确认支付订单"
                     visible={this.state.showTopup}
                     num={2}
                     btnText="确认支付"
                     propsArray={topupPropsArray}
                     btnProps={{ onClick: this.submitTopup }}
                     toggleModal={ this.toggleTopup } />
    </div>
    );
  }
}

export default ShoppingOrderPage;
