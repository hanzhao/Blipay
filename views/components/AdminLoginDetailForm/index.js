/*
 * 登录界面
 */

import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router';
import styles from './styles';
import { login } from '../../redux/modules/admin';

@reduxForm({
  form: 'user-login',
  fields: ['username', 'password']
}, undefined, {
  onSubmit: (data) => login(data)
})

class LoginForm extends React.Component {
  render() {
    const { fields: {
      username,
      password
    }, handleSubmit } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item>
          <Input size="large"
                 placeholder="账户"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 {...username} />
        </Form.Item>
        <Form.Item>
          <Input size="large"
                 type="password"
                 placeholder="密码"
                 addonBefore={<Icon type="lock" />}
                 {...password} />
        </Form.Item>
        <Button type="primary" size="large"
                className={styles.btn}
                htmlType="submit" >
          登录
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
