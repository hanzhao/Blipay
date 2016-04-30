/*
 * 主页注册或登录框
 */

import React from 'react';

import RegisterForm from '../RegisterForm';
import LoginForm from '../LoginForm';
import FindPasswordForm from '../FindPasswordForm';

import styles from './styles';

class RegisterOrLoginForm extends React.Component {
  /* 0: 密码找回 */
  /* 1: 登录 */
  /* 2: 注册 */
  /* 初始显示的是登录框 */
  state = {
    active: 1
  };
  handleSwitchPanel = (key) => {
    // 0deg - 90deg(switch) - 0deg
    let progress = 0;
    let inc = 5 * (key < this.state.active ? 1 : -1);
    const frame = () => {
      this.refs.root.style.transform = `rotateY(${progress}deg)`;
      progress += inc;
      if (progress > 90 || progress < -90) {
        inc = -inc;
        this.setState({ active: key });
      }
      /* 进行下一帧播放 */
      if (progress != 0) {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);
  };
  render() {
    return (
      <div ref="root" className={styles.form}>
        { this.state.active == 0 &&
          <FindPasswordForm handleSwitchPanel={this.handleSwitchPanel} /> }
        { this.state.active == 1 &&
          <LoginForm handleSwitchPanel={this.handleSwitchPanel} /> }
        { this.state.active == 2 &&
          <RegisterForm handleSwitchPanel={this.handleSwitchPanel} /> }
      </div>
    );
  }
}

export default RegisterOrLoginForm;
