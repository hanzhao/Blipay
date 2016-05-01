/*
 * 个人账户界面
 */

import React from 'react';

import Container from '../Container';
import AccountMenu from '../AccountMenu';

import styles from './styles';

class AccountPage extends React.Component {
  render() {
    return (
      <Container className={styles.container}>
        <div className={styles.left}>
          <AccountMenu />
        </div>
        <div className={styles.right}>
          { this.props.children }
        </div>
      </Container>
    );
  }
}

export default AccountPage;
