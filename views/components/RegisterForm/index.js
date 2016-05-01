/*
 * 注册界面
 */

import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';

import styles from './styles';

@reduxForm({
  form: 'user-register',
  fields: ['username', 'password', 'repassword']
}, undefined, {
  onSubmit: (data) => console.log(data)
})
class RegisterForm extends React.Component {
  render() {
    const { fields: {
      username,
      password,
      repassword
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
        <Form.Item>
          <Input size="large"
                 type="password"
                 placeholder="重复密码"
                 addonBefore={<Icon type="lock" />}
                 {...repassword} />
        </Form.Item>
        <Button type="primary" size="large"
                className={styles.btn}
                htmlType="submit">
          注册
        </Button>
        <div className={styles.bottomLeft}>
          <a onClick={this.props.handleSwitchPanel.bind(this, 1)}>
            <Icon type="left" /> 登录账户
          </a>
        </div>
      </Form>
    );
  }
}

export default RegisterForm;
