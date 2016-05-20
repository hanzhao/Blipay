/*
 * 登录界面
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { login } from '../../redux/modules/account/auth';
import store from '../../redux/store';
import styles from './styles';

@connect(
  (state) => ({
    loggingIn: state.account.auth.loggingIn,
    errorMsg: state.account.auth.errorMsg
  }), 
  {
    login
  }
)
@reduxForm({
  form: 'user-login',
  fields: ['username', 'password']
}, undefined, {
  onSubmit: (data) => {
    store.dispatch(login(data.username, data.password));
  }
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
                 placeholder="用户名"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 valida
                 {...username} />
        </Form.Item>
        <Form.Item>
          <Input size="large"
                 type="password"
                 placeholder="登录密码"
                 addonBefore={<Icon type="lock" />}
                 {...password} />
        </Form.Item>
        <div className={styles.hint}>
          {this.props.errorMsg ? this.props.errorMsg : '　'}
        </div>
        {
          <Button type="primary" size="large"
                  className={styles.btn}
                  style={this.props.loggingIn ? {'paddingLeft': '100px'} : {}}
                  htmlType="submit" loading={this.props.loggingIn}>
            登录
          </Button>
        }
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
