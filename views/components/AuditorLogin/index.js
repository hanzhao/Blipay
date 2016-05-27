/*
 * 登录界面
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'; 
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { Auditorlogin, AuditorisLoggedIn, AuditorgetErrorMsg } from '../../redux/modules/auditor/auth';
import store from '../../redux/store';
import styles from './styles';

const waitLogin = () => {
  if (AuditorisLoggedIn(store.getState())) {
    store.dispatch(push('/audit'));
  } else if (AuditorgetErrorMsg(store.getState())) {
    return;
  } else {
    setTimeout(waitLogin, 500);
  }
};

@connect(
  (state) => ({
    loggingIn: state.auditor.auth.loggingIn,
    errorMsg: state.auditor.auth.errorMsg
  }), 
  {
    Auditorlogin
  }
)

@reduxForm({
  form: 'user-Auditorlogin',
  fields: ['username', 'password']
}, undefined, {
  onSubmit: (data) => {
    store.dispatch(Auditorlogin(data.username, data.password));
    waitLogin();
  }
})
class AuditorLogin extends React.Component {
 render() {
    const { fields: {
      username,
      password
    }, handleSubmit } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
         <h1 className={styles.label}>审计员登录</h1>
         
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
        <div className={styles.hint}>
          {this.props.errorMsg ? this.props.errorMsg : '　'}
        </div>
        {
          <Button type="primary" size="large"
                  className={styles.btn}
                  htmlType="submit" loading={this.props.loggingIn}>
            登录
          </Button>
        }
      </Form>
    );
  }
}

export default AuditorLogin;
