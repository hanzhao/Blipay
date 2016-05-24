/*
 * 登录界面
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { login } from '../../redux/modules/account';
import store from '../../redux/store';
import styles from './styles';

const translate = {
  USER_NOT_EXIST: '当前用户名未注册。',
  INVALID_USERNAME_OR_PASSWORD: '用户名或密码错误。'
};

@connect(
  (state) => ({
    message: state.account.message
  })
)
@reduxForm({
  form: 'user-login',
  fields: ['userName', 'loginPass']
}, undefined, {
  onSubmit: (data) => login(data)
})
class LoginForm extends React.Component {
  render() {
    const { fields: {
      userName,
      loginPass
    }, handleSubmit, message } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item>
          <Input size="large"
                 placeholder="用户名"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 valida
                 {...userName} />
        </Form.Item>
        <Form.Item>
          <Input size="large"
                 type="password"
                 placeholder="登录密码"
                 addonBefore={<Icon type="lock" />}
                 {...loginPass} />
        </Form.Item>
        <div className={styles.hint}>
          { message ? translate[message] || '出现未知错误。' : ' ' }
        </div>
        <Button type="primary" size="large"
                className={styles.btn}
                htmlType="submit">
          登录
        </Button>
        <div className={styles.bottomLeft}>
          <a onClick={this.props.handleSwitchPanel.bind(this, 0)}>
            <Icon type="left" /> 忘记密码？
          </a>
        </div>
        <div className={styles.bottomRight}>
          <a onClick={this.props.handleSwitchPanel.bind(this, 2)}>
            注册新账户 <Icon type="right" />
          </a>
        </div>
      </Form>
    );
  }
}

export default LoginForm;
