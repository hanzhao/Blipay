/*
 * 导航条类
 */
import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

import Container from '../Container';
import Logo from '../Logo';

import styles from './styles';

/*
 * 菜单数据
 */
const menus = [
  { to: '/', text: '首页' },
  { to: '/profile', text: '个人账户' },
  { to: '/shopping', text: '购买商品' },
  { to: '/booking', text: '在线订票' }
]

class NavBar extends React.Component {
  render() {
    return (
      <Container className={styles.navbar}>
        <Logo className={styles.logo} />
        <Menu className={styles.menu}
              mode="horizontal"
              selectedKeys={[location.pathname]}>
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

export default NavBar;
