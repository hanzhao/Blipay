/*
 * 导航条类
 */
import React from 'react';
import Container from '../Container';
import Logo from '../Logo';

import styles from './styles';

/*
 * 菜单数据
 */


class NavBar extends React.Component {
  render() {
    return (
      <Container className={styles.navbar}>
        <Logo className={styles.logo} />
      </Container>
    );
  }
}

export default NavBar;
