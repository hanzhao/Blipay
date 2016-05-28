/*
 * shopping menu
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/shopping/info', text: '浏览宝贝', icon: 'info-circle-o' },
  { to: '/shopping/cart', text: '购物车', icon: 'shopping-cart' },
  { to: '/shopping/order', text: '订单管理', icon: 'exception' },
  { to: '/shopping/add_item', text: '商品添加', icon: 'plus-square' },
  { to: '/shopping/manage_item', text: '商品管理', icon: 'exception' },
];

class ShoppingMenu extends React.Component {
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

export default ShoppingMenu;
