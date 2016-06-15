import React from 'react'
import { Link } from 'react-router'
import { asyncConnect } from 'redux-connect'
import ShoppingPageHeader from '../ShoppingPageHeader'
import { Table, Popconfirm, Input, Icon, Button } from 'antd'
import moment from 'moment'

import {
  loadMyRooms,
  setRoomDisabled,
  setRoomEnabled
} from '../../redux/modules/shopping'
import store from '../../redux/store'

import styles from './styles'

const disableRoom = (id) => {
  store.dispatch(setRoomDisabled({ id }))
}

const enableRoom = (id) => {
  store.dispatch(setRoomEnabled({ id }))
}

const columns = [{
  title: '房间类型',
  dataIndex: 'name',
  key: 'name',
  sorter: (a, b) => a.name.localeCompare(b.name, 'zh-CN')
}, {
  title: '售价',
  dataIndex: 'price',
  key: 'price',
  sorter: (a, b) => a < b ? -1 : 1
}, {
  title: '状态',
  dataIndex: 'disabled',
  key: 'disabled',
  sorter: (a, b) => a < b ? -1 : 1,
  render(text) {
    return <span>{ text ? '隐藏中' : '接受预订中' }</span>
  }
}, {
  title: '操作',
  dataIndex: 'operation',
  key: 'operation',
  render(text, record) {
    if (record.disabled === 0) {
      return (
        <Popconfirm title={`确实要隐藏 ${record.name} 吗？`}
                    onConfirm={disableRoom.bind(this, record.id)}>
          <a>
            隐藏该房间
          </a>
        </Popconfirm>
      )
    }
    else {
      return (
        <Popconfirm title={`确实要显示 ${record.name} 吗？`}
                    onConfirm={enableRoom.bind(this, record.id)}>
          <a>
            显示该房间
          </a>
        </Popconfirm>
      )
    }
  }
}]

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadMyRooms())
    }
  }],
  (state) => ({
    rooms: state.shopping.myRooms
  })
)
class ShoppingManageRoomPage extends React.Component {
  render() {
    const rooms = this.props.rooms.map(e => ({ ...e, key: e.id }))
    return (
      <div>
        <ShoppingPageHeader icon="home" text="管理酒店房间" />
        <div className={styles.container}>
          <div className={styles.btn}>
            <Link to="/shopping/add_room">
              <Button type="primary">
                增加房间
              </Button>
            </Link>
          </div>
          <Table dataSource={rooms}
                 columns={columns}
                 pagination={{ showSizeChanger: true }} />
        </div>
      </div>
    )
  }
}

export default ShoppingManageRoomPage
