import React from 'react';
import { Table } from 'antd';

import styles from './styles';

const columns = [{
  title: '交易时间',
  dataIndex: 'date',
  key: 'date',
      sorter: (a, b) => a.date - b.date
}, {
  title: '买方',
  dataIndex: 'buyerId',
  key: 'buyerId'
},{
  title: '买方支出',
  dataIndex: 'amount',
  key: 'buy',
    sorter: (a, b) => a.amount - b.amount
}, {
  title: '卖方',
  dataIndex: 'sellerId',
  key: 'sellerId'
},{
  title: '卖方收入',
  dataIndex: 'amount',
  key: 'sell'
}, {
  title: '交易状态',
  dataIndex: 'status',
  key: 'status'
}, {
  title: '错误状态',
  dataIndex: 'error',
  key: 'error'
}, {
  title: '审计员备注',
  dataIndex: 'tips',
  key: 'tips'
}];



const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index,
    amount: `${d.amount.toFixed(2)}`
  }));
};

class AuditRecordTable extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <Table dataSource={wrapAmount(this.props.data || [])}
               columns={columns} {...this.props.tableProps } />

      </div>
    );
  }
}

export default AuditRecordTable;
