/*
 * 左边的导航条
 */

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/admin/account/welcome', text: '基本信息', icon: 'info-circle-o'},
  { to: '/admin/account/change', text: '修改用户信息', icon: 'solution' },
  { to: '/admin/account/verification', text: '用户验证', icon: 'check-circle' },
  { to: '/admin/account/judgement', text: '仲裁', icon: 'team' }
];

class AdminMenu extends React.Component {
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

export default AdminMenu;
