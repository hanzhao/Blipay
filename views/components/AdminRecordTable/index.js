import React from 'react';
import { Table } from 'antd';
import moment from 'moment';

import styles from './styles';

const columns = [{
  title: '日志 ID',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '详细信息',
  dataIndex: 'content',
  key: 'content'
}, {
  title: '操作人',
  dataIndex: 'admin',
  key: 'adminId',
  render(text) {
    return (
      <span>{ text.adminName }</span>
    )
  }
}, {
  title: '操作时间',
  dataIndex: 'createdAt',
  key: 'createdAt',
  render(text) {
    return (
      <span>{ moment(text).fromNow() }</span>
    )
  }
}];

class AdminRecordTable extends React.Component {
  render() {
    return (
      <div className={styles.table}>
        <Table dataSource={this.props.data}
               columns={columns} />
      </div>
    );
  }
}

export default AdminRecordTable;
