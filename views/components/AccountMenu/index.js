/*
 * 左边的导航条
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/account', text: '基本信息', icon: 'info-circle-o' },
  { to: '/account/records', text: '交易记录', icon: 'file-text' },
  { to: '/account/security', text: '安全设置', icon: 'unlock' },
];

class AccountMenu extends React.Component {
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

export default AccountMenu;
