/*
 * 登录界面
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { login } from '../../redux/modules/auditor';
import styles from './styles';

@connect(
  (state) => ({
    message: state.auditor.message
  })
)
@reduxForm({
  form: 'user-login',
  fields: ['userName', 'loginPass']
}, undefined, {
  onSubmit: (data) => login(data)
})
class AuditorLogin extends React.Component {
  render() {
    const { fields: {
      userName,
      loginPass
    }, handleSubmit, message } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <h1 className={styles.label}>审计员登录</h1>
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
          { message }
        </div>
        <Button type="primary" size="large"
                className={styles.btn}
                htmlType="submit">
          登录
        </Button>
        
      </Form>
    );
  }
}

export default AuditorLogin;
