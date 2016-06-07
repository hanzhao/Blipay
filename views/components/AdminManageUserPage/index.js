import React from 'react'
import { asyncConnect } from 'redux-connect'
import { Table, Popconfirm, Input,Icon } from 'antd'
import moment from 'moment'

import { loadUsersInfo,
         setUserDisabled,
         setUserEnabled } from '../../redux/modules/admin'
import store from '../../redux/store'

import styles from './styles'

const disableUser = (id) => {
  store.dispatch(setUserDisabled({ id }))
}

const enableUser = (id) => {
  store.dispatch(setUserEnabled({ id }))
}

const columns = [{
  title: '用户 ID',
  dataIndex: 'id',
  key: 'id',
  sorter: (a, b) => a.id < b.id ? -1 : 1
}, {
  title: '用户名',
  dataIndex: 'userName',
  key: 'userName',
  sorter: (a, b) => a.userName < b.userName ? -1 : 1
}, {
  title: '真实姓名',
  dataIndex: 'realName',
  key: 'realName',
  sorter: (a, b) => a.realName.localeCompare(b.realName, 'zh-CN')
}, {
  title: '身份证号',
  dataIndex: 'idNumber',
  key: 'idNumber',
  sorter: (a, b) => a.idNumber < b.idNumber ? -1 : 1
}, {
  title: '账户余额',
  dataIndex: 'balance',
  key: 'balance',
  sorter: (a, b) => a.balance < b.balance ? -1 : 1
}, {
  title: '最后上线时间',
  dataIndex: 'lastLogin',
  key: 'lastLogin',
  sorter: (a, b) => new Date(a.lastLogin) < new Date(b.lastLogin) ? -1 : 1,
  render(text) {
    return (
      <span>{ moment(text).format('LLL') }</span>
    )
  }
}, {
  title: '认证状态',
  dataIndex: 'status',
  key: 'status',
  render(text, record) {
    switch (record.status) {
      case 1:
        return <span className={styles.statusVerifying}>审核中</span>
      case 2:
        return <span className={styles.statusVerified}>认证通过</span>
      default:
        return <span className={styles.statusUnverified}>未认证</span>
    }
  }
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render(text, record) {
    if (record.disabled === 0) {
      return (
        <Popconfirm title={`确实要禁用 ${record.userName} 吗？`}
                    onConfirm={disableUser.bind(this, record.id)}>
          <a>
            禁用
          </a>
        </Popconfirm>
      )
    }
    else {
      return (
        <Popconfirm title={`确实要启用 ${record.userName} 吗？`}
                    onConfirm={enableUser.bind(this, record.id)}>
          <a>
            启用
          </a>
        </Popconfirm>
      )
    }
  }
}]

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadUsersInfo())
    }
  }],
  (state) => ({
    users: state.admin.managedUsers
  })
)
class AdminManageUserPage extends React.Component {
  state = {
    filter: ''
  };
  handleFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }
  render() {
    const users = this.props.users.filter(e => e.userName.indexOf(this.state.filter) !== -1)
                                  .map(e => ({ ...e, key: e.id }))
    return (
      <div>
        <div className={styles.input}>
          <Input addonBefore={<Icon type="search" />} value={this.state.filter} onChange={this.handleFilter}
                 placeholder="输入用户名开始搜索" />
        </div>
        <Table dataSource={users}
               columns={columns}
               pagination={{ showSizeChanger: true }} />
      </div>
    )
  }
}

export default AdminManageUserPage
