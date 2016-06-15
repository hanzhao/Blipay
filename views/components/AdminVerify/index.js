/** 管理员处理用户实名验证页面 */
import React from 'react';
import { Link } from 'react-router';
import { Input, Button, Row, Col, Table, Popover, Popconfirm } from 'antd';
import { asyncConnect } from 'redux-connect';

import store from '../../redux/store';
import AdminPageHeader from '../AdminPageHeader';
import { loadVerifyingList, verify } from '../../redux/modules/admin';
import styles from './styles';

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的用户验证请求的最大数目 */
    pageSize: Math.floor((window.innerHeight - 350) / 50)
  }
};

const doVerify = (data) => (
  store.dispatch(verify(data))
)

const columns = [{
  title: '用户 ID',
  dataIndex: 'id',
  key: 'id',
  sorter: (a, b) => a.id < b.id ? -1: 1
}, {
  title: '用户名',
  dataIndex: 'userName',
  key: 'userName',
  sorter: (a, b) => a.userName < b.userName ? -1: 1
}, {
  title: '用户身份证号码',
  dataIndex: 'idNumber',
  key: 'idNumber',
  sorter: (a, b) => a.idNumber < b.idNumber ? -1: 1,
  render(text, record) {
    return (
      <Popover content={
        <Row>
          <Col span="12">
            <h2>正面照片</h2>
            <div>
              <img src={`/api/photo/show?id=${record.cardFront}`} />
            </div>
          </Col>
          <Col span="12">
            <h2>反面照片</h2>
            <div>
              <img src={`/api/photo/show?id=${record.cardBack}`} />
            </div>
          </Col>
        </Row>
      } title="身份证照片" trigger="hover">
        <Button type="dashed">{ text }</Button>
      </Popover>
    )
  }
}, {
  title: '用户真实姓名',
  dataIndex: 'realName',
  key: 'realName',
  sorter: (a, b) => a.realName.localeCompare(b.realName, 'zh-CN')
}, {
  title: '操作',
  dataIndex: 'status',
  key: 'status',
  render(status, record) {
    return (
      <div>
        { status === 0 && <span>拒绝了实名验证</span> }
        { status === 1 &&
          <span className={styles.buttons}>
          <Popconfirm title="确定通过这个用户的实名验证吗？"
                      onConfirm={doVerify.bind(this, {
                        id: record.id,
                        status: 2
                      })}>
            <Button type="primary">通过</Button>
          </Popconfirm>
          <Popconfirm title="确定拒绝这个用户的实名验证吗？"
                      onConfirm={doVerify.bind(this, {
                        id: record.id,
                        status: 0
                      })}>
            <Button>拒绝</Button>
          </Popconfirm>
          </span>
        }
        { status === 2 && <span>通过了实名验证</span> }
      </div>
    )
  }
}];

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadVerifyingList())
    }
  }],
  (state) => ({
    verifyingUsers: state.admin.verifyingUsers
  })
)
class AdminVerify extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <AdminPageHeader icon="check-circle" text="用户验证" />
        <Table
               className={styles.table}
               columns={columns}
               dataSource={this.props.verifyingUsers}
               {...tableProps} />
      </div>
    );
  }
}

export default AdminVerify;
