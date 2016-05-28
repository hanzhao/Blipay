/*
 * 審計員导航
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/audit', text: '最新帐单', icon: 'star' },
  { to: '/audit/search', text: '检索', icon: 'search' },
  { to: '/audit/log', text: '日誌', icon: 'file-text' },
];


class AccountMenu extends React.Component {
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

export default AccountMenu;
