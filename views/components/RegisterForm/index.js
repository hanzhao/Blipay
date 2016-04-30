/*
 * 注册界面
 */

import React from 'react';
import { Form, FormItem, Input, Icon, Button } from 'antd';

import styles from './styles';

class RegisterForm extends React.Component {
  render() {
    return (
      <Form horizontal>
        <Form.Item>
          <Input size="large"
                 placeholder="账户"
                 addonBefore={<Icon type="user" />}
                 autoFocus />
        </Form.Item>
        <Form.Item>
          <Input size="large"
                 placeholder="密码"
                 addonBefore={<Icon type="lock" />} />
        </Form.Item>
        <Button type="primary" size="large"
                className={styles.btn} >
          注册
        </Button>
        <div className={styles.bottomLeft}>
          <a onClick={this.props.handleSwitchPanel.bind(this, 1)}>登录账户</a>
        </div>
      </Form>
    );
  }
}

export default RegisterForm;
