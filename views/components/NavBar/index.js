/*
 * 导航条类
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Menu } from 'antd';
import Container from '../Container';
import Logo from '../Logo';
import styles from './styles';

import { logout } from '../../redux/modules/account'
/*
 * 菜单数据
 */
const getFirstPart = () => `/${location.pathname.split('/')[1]}`;

@connect(
  (state) => ({
    user: state.account.user,
    rerender: state.account.__SECRET_RERENDER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  }),
  (dispatch) => ({
    logout: () => dispatch(logout())
  })
)
class NavBar extends React.Component {
  render() {
    const { user, logout } = this.props
    return (
      <Container className={styles.navbar}>
        <Logo className={styles.logo} />
        <Menu className={styles.menu}
              mode="horizontal"
              selectedKeys={[getFirstPart(location.pathname)]}>
          <Menu.Item key="/account" style={{ display: user ? 'inherit' : 'none' }}>
            <Link to="/account">个人账户</Link>
          </Menu.Item>
          <Menu.Item key="/shopping">
            <Link to={user && user.booker ? "/shopping/order" : "/shopping"}>在线商城</Link>
          </Menu.Item>
          <Menu.Item key="/" style={{ display: !user ? 'inherit' : 'none' }}>
            <Link to="/">登录</Link>
          </Menu.Item>
          <Menu.Item key="/logout" style={{ display: user ? 'inherit' : 'none' }}>
            <a onClick={logout}>登出</a>
          </Menu.Item>
        </Menu>


      </Container>
    );
  }
}

export default NavBar;
