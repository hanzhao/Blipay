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
  dataIndex: 'userId',
  key: 'buyer'
},{
  title: '买方支出',
  dataIndex: 'amount',
  key: 'buy',
    sorter: (a, b) => a.amount - b.amount,
}, {
  title: '买方',
  dataIndex: 'userId',
  key: 'seller'
},{
  title: '卖方收入',
  dataIndex: 'date',
  key: 'sell'
}, {
  title: '交易状态',
  dataIndex: 'status',
  key: 'status'
}];


function onChange(pagination, filters, sorter) {
  // 点击分页、筛选、排序时触发
  console.log('各类参数是', pagination, filters, sorter);
}


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
               columns={columns} {...this.props.tableProps } onChange={onChange}/>

      </div>
    );
  }
}

export default AuditRecordTable;
