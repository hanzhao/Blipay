/** 管理员 管理次级管理员页面 */
import React from 'react'
import { Link } from 'react-router'
import { asyncConnect } from 'redux-connect'
import { Table, Popconfirm, Input, Button, Row, Col, Icon } from 'antd'
import moment from 'moment'

import { loadAdminsInfo,
         setAdminDisabled,
         setAdminEnabled } from '../../redux/modules/admin'
import store from '../../redux/store'

import styles from './styles'

const disableAdmin = (id) => {
  store.dispatch(setAdminDisabled({ id }))
}

const enableAdmin = (id) => {
  store.dispatch(setAdminEnabled({ id }))
}

/** 管理表单头 */
const columns = [{
  title: '管理员 ID',
  dataIndex: 'id',
  key: 'id',
  sorter: (a, b) => a.id < b.id ? -1 : 1
}, {
  title: '用户名',
  dataIndex: 'adminName',
  key: 'adminName',
  sorter: (a, b) => a.adminName < b.adminName ? -1 : 1
}, {
  title: '真实姓名',
  dataIndex: 'realName',
  key: 'realName',
  sorter: (a, b) => a.realName.localeCompare(b.realName, 'zh-CN')
}, {
  title: '管理权限',
  dataIndex: 'level',
  key: 'level',
  sorter: (a, b) => new Date(a.level) < new Date(b.level) ? -1 : 1,
  render(text) {
    return (
      <span>{ text ? '普通管理员' : '超级管理员' }</span>
    )
  }
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render(text, record) {
    if (record.disabled === 0) {
      return (
        <Popconfirm title={`确实要禁用 ${record.adminName} 吗？`}
                    onConfirm={disableAdmin.bind(this, record.id)}>
          <a>
            禁用
          </a>
        </Popconfirm>
      )
    }
    else {
      return (
        <Popconfirm title={`确实要启用 ${record.adminName} 吗？`}
                    onConfirm={enableAdmin.bind(this, record.id)}>
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
      return dispatch(loadAdminsInfo())
    }
  }],
  (state) => ({
    admins: state.admin.managedAdmins
  })
)
class AdminManageAdminPage extends React.Component {
  state = {
    filter: ''
  };
  handleFilter = (e) => {
    this.setState({
      filter: e.target.value
    })
  }
  render() {
    const admins = this.props.admins.filter(e => e.adminName.indexOf(this.state.filter) !== -1)
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
              <Link to="/admin/panel/manage/admin/add">
                <Button type="primary">
                  增加管理员
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
        <Table dataSource={admins}
               columns={columns}
               pagination={{ showSizeChanger: true }} />
      </div>
    )
  }
}

export default AdminManageAdminPage
