import React from 'react'
import { Link } from 'react-router'
import { asyncConnect } from 'redux-connect'
import { Table, Popconfirm, Input, Button, Row, Col, Icon } from 'antd'
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
  title: '酒店管理员 ID',
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
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render(text, record) {
    if (record.disabled === 0) {
      return (
        <Popconfirm title={`确实要冻结 ${record.userName || record.realName} 吗？`}
                    onConfirm={disableUser.bind(this, record.id)}>
          <a>
            冻结
          </a>
        </Popconfirm>
      )
    }
    else {
      return (
        <Popconfirm title={`确实要解冻 ${record.userName || record.realName} 吗？`}
                    onConfirm={enableUser.bind(this, record.id)}>
          <a>
            解冻
          </a>
        </Popconfirm>
      )
    }
  }
}]

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadUsersInfo({ booker: 1 }))
    }
  }],
  (state) => ({
    users: state.admin.managedUsers
  })
)
class AdminManageBookerPage extends React.Component {
  state = {
    filter: ''
  };
  handleFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }
  render() {
    const users = this.props.users.filter(e => e.userName.indexOf(this.state.filter) !== -1 || e.realName.indexOf(this.state.filter) !== -1)
                                    .map(e => ({ ...e, key: e.id }))
    return (
      <div>
        <div className={styles.input}>
          <Row>
            <Col span="6">
              <Input addonBefore={<Icon type="search" />}
                     value={this.state.filter} onChange={this.handleFilter}
                     placeholder="输入用户名开始搜索" />
            </Col>
            <Col span="12" offset="1">
              <Link to="/admin/panel/manage/booker/add">
                <Button type="primary">
                  增加票务管理员
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table dataSource={users}
               columns={columns}
               pagination={{ showSizeChanger: true }} />
      </div>
    )
  }
}

export default AdminManageBookerPage
