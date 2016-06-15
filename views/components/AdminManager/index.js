/*
 * Admin 的管理管理员主界面
 */
import React from 'react';
import { Input, Button, Col, Table} from 'antd';
import styles from './styles';

/** 表格头 */
const columns = [{
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
  render(text) {
    return <a href="#">{text}</a>;
  }
}, {
  title: '权限',
  dataIndex: 'age',
  key: 'age'
}, {
  title: '操作',
  key: 'operation',
  render(text, record) {
    return (
      <span>
        <Button className={styles.addBtn}>
        更改权限为{record.address}
        </Button>
      </span>
    );
  }
}];
const data = [{
  key: '1',
  name: 'potaty',
  age: '高级管理员',
  address: '普通管理员'
}, {
  key: '2',
  name: 'potu',
  age: '管理员',
  address: '无权限用户'
}, {
  key: '3',
  name: 'suddiv',
  age: '无权限管理员',
  address: '普通管理员'
}];

/** 主页面 */
class AdminManager extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <span className={styles.searchtext}>管理员帐号搜索</span>
        <div className={styles.search}>
         <Col span="6">
          <Input id="defaultInput" placeholder="请输入管理员用户名" />
         </Col>
        </div>
        <div>
          <Button className={styles.addBtn} type="ghost" size="small">
            添加管理员
          </Button>
        </div>
        <Table className={styles.table} columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default AdminManager;
