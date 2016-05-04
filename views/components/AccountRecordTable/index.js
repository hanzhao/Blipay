import React from 'react';
import { Table } from 'antd';

import styles from './styles';

const columns = [{
  title: '交易时间',
  dataIndex: 'date',
  key: 'date'
}, {
  title: '详细信息',
  dataIndex: 'description',
  key: 'description'
}, {
  title: '交易金额',
  dataIndex: 'amount',
  key: 'amount'
}, {
  title: '交易状态',
  dataIndex: 'status',
  key: 'status'
}];

const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index,
    amount: `${d.amount > 0 ? '+' : ''}${d.amount.toFixed(2)}`
  }));
};

class AccountRecordTable extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <Table dataSource={wrapAmount(this.props.data || [])} columns={columns} {...this.props.tableProps}/>
      </div>
    );
  }
}

export default AccountRecordTable;
