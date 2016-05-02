/*
 * shopping menu
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/shopping', text: '浏览宝贝', icon: 'info-circle-o' },
  { to: '/shopping/shoppingcart', text: '购物车', icon: 'file-text' },
  { to: '/shopping/shoppingorder', text: '订单管理', icon: 'unlock' },
];


class ShoppingMenu extends React.Component {
  render() {
    return (
      <Menu onClick={this.handleClick}
        style={{ width: 240 }}
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

export default ShoppingMenu;