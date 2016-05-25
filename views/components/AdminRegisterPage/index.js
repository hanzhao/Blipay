/*
 * 注册界面
 */
import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { adminRegister } from '../../redux/modules/admin';
import { Link } from 'react-router';
import store from '../../redux/store';
import ajax from '../../common/ajax';

@reduxForm({
  form: 'user-register',
  fields: ['username', 'password','level']
}, undefined, {
  onSubmit: (data) => adminRegister(data)
})
// @connect(
//   (state) => ({
//     registering: state.admin.registering,
//     errorMsg: state.admin.errorMsg
//   })
// )

class RegisterForm extends React.Component {
  render() {
    const { fields: {
      username,
      password,
      level
    }, handleSubmit } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item>username
          <Input size="large"
                 placeholder="账户"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 {...username} />
        </Form.Item>
        <Form.Item>password
          <Input size="large"
                 type="password"
                 placeholder="密码"
                 addonBefore={<Icon type="lock" />}
                 {...password} />
        </Form.Item>
        <Form.Item>等级(0超级管理员，1订票管理员，2审计员，3系统管理员)
          <Input size="large"
                 placeholder="等级(0超级管理员，1订票管理员，2审计员，3系统管理员)"
                 addonBefore={<Icon type="lock" />}
                 {...level} />
        </Form.Item>
        <Button type="primary" size="large"
                htmlType="submit" >
          register
        </Button>
      </Form>
    );
  }
}

class AdminRegisterPage extends React.Component {
  render() {
    return (
          <div>
              <RegisterForm />
          </div>
    );
  }
}

export default AdminRegisterPage;
