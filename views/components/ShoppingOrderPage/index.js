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
        productImage: 'http://img11.360buyimg.com/n7/jfs/t2431/190/606622558/88271/c7f60a45/561dd18bN3a0afa3e.jpg',
        productName: '惠普Z640工作站',
        price: 48299,
        amount: 2,
        orderID: '09090909090',
        totalCost: 48299*2,
        status:0
    });

  const columns = [{
      title: '',
      dataIndex: 'productImage',
      key: 'productImage',
      render: (d) => {
        return <img src={d}  className={styles.itemImage}/>
      }
    }, {
      title: '宝贝',
      dataIndex: 'productName',
      key: 'productName',
      render: (d) => {
           return <span className={styles.itemName}>{d}</span>;   
      }
    }, {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (d) => {
           return <span className={styles.itemPrice}>{Number(d).toFixed(2)}</span>;   
      }
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
      key: 'totalCost',
      render: (d) => {
           return <span className={styles.itemTotalCost}>{Number(d).toFixed(2)}</span>;   
      }
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (d) => {
        return <Button type="ghost" onClick={this.toggleTopup} >确认付款</Button>
      }
    }];

  const tableProps = {
    pagination: {
      simple: true,
      pageSize: Math.floor((window.innerHeight - 350) / 50)
    }
  };

    return (
    <div className={styles.container}>
        <Table columns={columns} dataSource={contents} {...tableProps} />
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
