/*
 * 导航条类
 */
import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';

import Container from '../Container';
import Logo from '../Logo';

import styles from './styles';

/*
 * 菜单数据
 */
const menus = [
  { to: '/auditor', text: '登出' }
];

const getFirstPart = () => `/${location.pathname.split('/')[1]}`;

class AuditorLoginBar extends React.Component {
  render() {
    return (
      <Container className={styles.navbar}>
        <Logo className={styles.logo} />
        <Menu className={styles.menu}
              mode="horizontal"
              selectedKeys={[getFirstPart(location.pathname)]}>
          { menus.map((t) => (
            <Menu.Item key={t.to}>
              <Link to={t.to}>{t.text}</Link>
            </Menu.Item>
          )) }
        </Menu>
      </Container>
    );
  }
}

export default AuditorLoginBar;
