/*
 * booking menu
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/booking/info', text: '浏览宝贝', icon: 'info-circle-o' },
  { to: '/booking/order', text: '订单管理', icon: 'exception' },
  { to: '/booking/add_item', text: '商品添加', icon: 'plus-square' },
  { to: '/booking/manage_item', text: '商品管理', icon: 'exception' },
];

class BookingMenu extends React.Component {
  render() {
    return (
      <Menu onClick={this.handleClick}
        defaultOpenKeys={['sub1']}
        selectedKeys={[location.pathname]}
        mode="inline">
        { menus.map((t) => (
          <Menu.Item key={t.to}>
            <Link to={t.to}>
              <Icon type={t.icon} /> {t.text}
            </Link>
          </Menu.Item>
        )) }
      </Menu>
    );
  }
}

export default BookingMenu;
