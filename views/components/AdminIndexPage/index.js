/*
 * 首页
 */
import React from 'react';

import Container from '../Container';
import AdminLoginForm from '../AdminLoginForm';

import styles from './styles';
import mascot from './2233.png';
import dust from './dust.png';

class AdminIndexPage extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}
           style={{ height: window.innerHeight - 85 }}>
        {/* 占满整个屏幕 */}
        <Container className={styles.container}>
          <AdminLoginForm />
          <div className={styles.mascot}>
            {/* 2233娘 */}
            <img className={styles.bili} src={mascot} />
            {/* 飘落物 */ }
            <img className={styles.dust} src={dust} />
          </div>
        </Container>
      </div>
    );
  }
}

export default AdminIndexPage;
