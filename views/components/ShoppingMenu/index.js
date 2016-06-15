/** 购物页面导航 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/shopping/info', text: '浏览宝贝', icon: 'info-circle-o' },
  { to: '/shopping/order', text: '订单管理', icon: 'exception' },
  { to: '/shopping/add_item', text: '商品添加', icon: 'plus-square' },
  { to: '/shopping/manage_item', text: '商品管理', icon: 'exception' },
];

@connect(
  (state) => ({
    user: state.account.user
  })
)
class ShoppingMenu extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Menu onClick={this.handleClick}
        defaultOpenKeys={['sub1']}
        selectedKeys={[location.pathname]}
        mode="inline">
        <Menu.Item key="/shopping/info" style={{ display: user && user.booker ? 'none' : 'inherit' }}>
          <Link to="/shopping/info">
            <Icon type="info-circle-o" /> 浏览宝贝
          </Link>
        </Menu.Item>
        <Menu.Item key="/shopping/book" style={{ display: user && user.booker ? 'none' : 'inherit' }}>
          <Link to="/shopping/book">
            <Icon type="home" /> 预订酒店
          </Link>
        </Menu.Item>
        <Menu.Item key="/shopping/order" style={{ display: user ? 'inherit' : 'none' }}>
          <Link to="/shopping/order">
            <Icon type="exception" /> 订单管理
          </Link>
        </Menu.Item>
        <Menu.Item key="/shopping/manage_room" style={{ display: user && user.booker ? 'inherit' : 'none' }}>
          <Link to="/shopping/manage_room">
            <Icon type="home" /> 管理房间
          </Link>
        </Menu.Item>
        <Menu.Item key="/shopping/add_item" style={{ display: user && !user.booker ? 'inherit' : 'none' }}>
          <Link to="/shopping/add_item">
            <Icon type="plus-square" /> 商品添加
          </Link>
        </Menu.Item>
        <Menu.Item key="/shopping/manage_item" style={{ display: user && !user.booker ? 'inherit' : 'none' }}>
          <Link to="/shopping/manage_item">
            <Icon type="exception" /> 商品管理
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default ShoppingMenu;
