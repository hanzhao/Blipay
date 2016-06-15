/*
 * 管理员注册界面
 */
import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { adminRegister } from '../../redux/modules/admin';
import { Link } from 'react-router';
import store from '../../redux/store';
import ajax from '../../common/ajax';


function showPopup(){
  message.success('注册成功！');
  setTimeout(() => {
    location.replace('/admin');
  }, 1000)
}

/** 表单修饰 */
@reduxForm({
  form: 'user-register',
  fields: ['username', 'password','level','realname','phone','email']
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
      level,
      realname,
      phone,
      email
    }, handleSubmit } = this.props;
    return (
      <div>
      <h3>注意：注册按钮没有写反馈。。。具体有没有成功要看数据库</h3>
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item>用户名
          <Input size="large"
                 placeholder="账户"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 {...username} />
        </Form.Item>
        <Form.Item>密码
          <Input size="large"
                 type="password"
                 placeholder="密码"
                 addonBefore={<Icon type="lock" />}
                 {...password} />
        </Form.Item>
        <Form.Item>等级(0超级管理员，1订票管理员，2审计员，4系统管理员)
          <Input size="large"
                 placeholder="等级(0超级管理员，1订票管理员，2审计员，4系统管理员)"
                 addonBefore={<Icon type="lock" />}
                 {...level} />
        </Form.Item>
        <Form.Item>真实姓名(可选)
          <Input size="large"
                 placeholder="真实姓名"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 {...realname} />
        </Form.Item>
        <Form.Item>电话(可选)
          <Input size="large"
                 placeholder="电话"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 {...phone} />
        </Form.Item>
        <Form.Item>邮箱(可选)
          <Input size="large"
                 placeholder="邮箱"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 {...email} />
        </Form.Item>
        <Button type="primary" size="large"
                htmlType="submit" onClick={showPopup}>
          register
        </Button>
      </Form>
      </div>
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
