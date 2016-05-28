import React from 'react';
import { Table } from 'antd';

import styles from './styles';

const columns = [{
  title: '操作时间',
  dataIndex: 'date',
  key: 'date'
}, {
  title: '详细信息',
  dataIndex: 'description',
  key: 'description'
}, {
  title: '操作人',
  dataIndex: 'amount',
  key: 'amount'
}, {
  title: '账户及操作',
  dataIndex: 'status',
  key: 'status'
}];

const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index
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
