import React from 'react';
import { Table } from 'antd';
import moment from 'moment'

import styles from './styles';

const columns = [{
  title: '交易流水号',
  dataIndex: 'orderId',
  key: 'orderId',
  sorter: (a, b) => a.orderId < b.iorderId ? -1 : 1
}, {
  title: '交易金额',
  dataIndex: 'totalCost',
  key: 'totalCost',
  sorter: (a, b) => a.totalCost < b.totalCost ? -1 : 1
}, {
  title: '买家id',
  dataIndex: 'buyerId',
  key: 'buyerId'
}, {
  title: '买家支出',
  dataIndex: 'buyerPay',
  key: 'buyerPay'
}, {
  title: '卖家id',
  dataIndex: 'sellerId',
  key: 'sellerId'
}, {
  title: '卖家收入',
  dataIndex: 'sellerGet',
  key: 'sellerGet'
}, {
  title: '交易状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => (
    <span>{ text ? '交易完成' : '等待处理' }</span>
  ),
  sorter: (a, b) => a.status < b.status ? -1 : 1
},{
  title: '错误判断',
  dataIndex: 'wrongStatus',
  key: 'wrongStatus',
  filters: [{
    text: '错误',
    value: '1',
  }, {
    text: '警告',
    value: '2',
  }],
  filterMultiple: true,
  onFilter: (value, record) => record.wrongStatus== value,
  render(text){
    switch(text)
    {
      case 0:
      return '正确';
      case 1:
      return <p><font color="red">错误</font></p>;
      case 2:
      return <p><font color="orange">警告</font></p>;
    } ;
  },
  sorter: (a, b) => a.wrongStatus < b.wrongStatus ? -1 : 1
}];

const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index,
    amount: `${d.totalCost.toFixed(2)}`
  }));
};

class AuditRecordTable extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <Table dataSource={wrapAmount(this.props.data || [])}
               columns={columns} {...this.props.tableProps} />
      </div>
    );
  }
}

export default AuditRecordTable;
