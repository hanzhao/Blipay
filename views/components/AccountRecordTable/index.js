/** 账户交易记录表格 */
import React from 'react';
import { Table } from 'antd';
import moment from 'moment'

import styles from './styles';

/** 表格头 */
const columns = [{
  title: '交易流水号',
  dataIndex: 'id',
  key: 'id',
  sorter: (a, b) => a.id < b.id ? -1 : 1
}, {
  title: '交易时间',
  dataIndex: 'createdAt',
  key: 'date',
  render: (text) => (
    <span>
      { moment(text).format('LLL') }
    </span>
  ),
  sorter: (a, b) => a.createdAt < b.createdAt ? -1 : 1
}, {
  title: '详细信息',
  dataIndex: 'info',
  key: 'info'
}, {
  title: '交易金额',
  dataIndex: 'amount',
  key: 'amount',
  sorter: (a, b) => a.amount < b.amount ? -1 : 1
}, {
  title: '交易状态',
  dataIndex: 'status',
  key: 'status',
  render: (text) => (
    <span>{ text ? '交易完成' : '等待处理' }</span>
  ),
  sorter: (a, b) => a.status < b.status ? -1 : 1
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
