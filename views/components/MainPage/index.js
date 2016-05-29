/*
 * 首页
 */
import React from 'react';
import { connect } from 'react-redux';

import Container from '../Container';
import RegisterOrLoginForm from '../RegisterOrLoginForm';

import styles from './styles';
import mascot from './2233.png';
import dust from './dust.png';

@connect(
  (state) => ({
    user: state.account.user
  })
)
class MainPage extends React.Component {
  render() {
    // 登录后会自动跳转
    if (this.props.user) {
      return <span></span>
    }
    return (
      <div className={styles.wrapper}
        style={{ height: window.innerHeight - 85 }}>
        {/* 占满整个屏幕 */}
        <Container className={styles.container}>
          <RegisterOrLoginForm />
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

export default MainPage;
