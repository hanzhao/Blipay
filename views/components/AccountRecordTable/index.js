import React from 'react';
import { Table } from 'antd';
import moment from 'moment'

import styles from './styles';

const columns = [{
  title: '交易流水号',
  dataIndex: 'id',
  key: 'id',
  sorter: (a, b) => a < b ? -1 : 1
}, {
  title: '交易时间',
  dataIndex: 'createdAt',
  key: 'date',
  render: (text) => (
    <span>
      { moment(text).format('LLL') }
    </span>
  ),
  sorter: (a, b) => new Date(a) < new Date(b) ? -1 : 1
}, {
  title: '详细信息',
  dataIndex: 'info',
  key: 'info'
}, {
  title: '交易金额',
  dataIndex: 'amount',
  key: 'amount',
  sorter: (a, b) => a < b ? -1 : 1
}, {
  title: '交易状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => (
    <span>{ text ? '交易完成' : '等待处理' }</span>
  )
}];

const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index,
    amount: `${d.amount.toFixed(2)}`
  }));
};

class AccountRecordTable extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <Table dataSource={wrapAmount(this.props.data || [])}
               columns={columns} {...this.props.tableProps} />
      </div>
    );
  }
}

export default AccountRecordTable;
