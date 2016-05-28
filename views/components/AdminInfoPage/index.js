/*
 * 个人账户界面
 */

import React from 'react';

import Container from '../Container';
import AdminMenu from '../AdminMenu';
import styles from './styles';

class AdminInfoPage extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}
           style={{ height: window.innerHeight - 85 }}>
        <Container className={styles.container}>
          <div className={styles.left}>
            <AdminMenu />
          </div>
          <div className={styles.right}>
            { this.props.children }
          </div>
        </Container>
      </div>
    );
  }
}

export default AdminInfoPage;
