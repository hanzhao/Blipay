/** 审计用户的数据表格 */
import React from 'react';
import { Table } from 'antd';
import moment from 'moment'

import styles from './styles';

/** 表头 */
const columns = [{
  title: '用户编号',
  dataIndex: 'id',
  key: 'id',
  sorter: (a, b) => a.id < b.id ? -1 : 1
}, {
  title: '用户名',
  dataIndex: 'userName',
  key: 'userName'
}, {
  title: '账户余额',
  dataIndex: 'amount',
  key: 'amount',
  sorter: (a, b) => a.amount < b.amount ? -1 : 1
}, {
  title: '注册时间',
  dataIndex: 'createdAt',
  key: 'date',
  render: (text) => (
    <span>
      { moment(text).format('LLL') }
    </span>
  ),
  sorter: (a, b) => a.createdAt < b.createdAt ? -1 : 1
}, {
  title: '最近登录时间',
  dataIndex: 'updatedAt',
  key: 'updatedAt',
  render: (text) => (
    <span>
      { moment(text).format('LLL') }
    </span>
  ),
  sorter: (a, b) => a.updatedAt < b.updatedAt ? -1 : 1
},];

/**填充表格 */
const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index,
    amount: `${d.balance.toFixed(2)}`
  }));
};

class AuditUserTable extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <Table dataSource={wrapAmount(this.props.data || [])}
               columns={columns} {...this.props.tableProps} />
      </div>
    );
  }
}

export default AuditUserTable;
