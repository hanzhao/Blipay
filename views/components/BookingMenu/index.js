/*
 * 订票左边菜单
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/booking/flight', text: '航班预订', icon: 'info-circle-o' },
  { to: '/booking/hotel', text: '酒店预订', icon: 'exception' },
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
