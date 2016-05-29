import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

const menus = [
  { to: '/admin/panel/manage/user', text: '普通用户', icon: 'team'},
  // { to: '/admin/panel/manage/ticketter', text: '票务管理员', icon: 'tag' },
  { to: '/admin/panel/manage/auditor', text: '审计员', icon: 'solution' },
  { to: '/admin/panel/manage/admin', text: '管理员', icon: 'user' }
];

import styles from './styles'

class AdminManagePage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Menu selectedKeys={[location.pathname]} mode="horizontal">
        { menus.map((t) => (
          <Menu.Item key={t.to}>
            <Link to={t.to}>
              <Icon type={t.icon} /> {t.text}
            </Link>
          </Menu.Item>
        )) }
        </Menu>
        <div style={{ marginTop: 30 }}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default AdminManagePage
