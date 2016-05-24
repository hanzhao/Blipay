/*
 * 主页注册或登录框
 */

import React from 'react';

import AdminLoginDetailForm from '../AdminLoginDetailForm';

import styles from './styles';

class AdminLoginForm extends React.Component {
  /* 0: 密码找回 */
  /* 1: 登录 */
  /* 2: 注册 */
  /* 初始显示的是登录框 */

  render() {
    return (
      <div ref="root" className={styles.form}>
          <AdminLoginDetailForm handleSwitchPanel={this.handleSwitchPanel} />
      </div>
    );
  }
}

export default AdminLoginForm;
