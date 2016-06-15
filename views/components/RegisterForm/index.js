/*
 * 注册界面
 */

import React from 'react';
import { reduxForm } from 'redux-form';
import { Form, Input, Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { register } from '../../redux/modules/account';
import ajax from '../../common/ajax';
import styles from './styles';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validate = (values) => {
  const errors = {};
  const { userName, loginPass, payPass } = values;
  if (!userName) {
    errors.userName = '请填写用户名。';
  }
  if (!loginPass) {
    errors.loginPass = '请填写登录密码。';
  } else if (!passwordRegex.test(loginPass)) {
    errors.loginPass = '密码必须包含字母和数字组合，长度至少 8 位。';
  }
  if (!payPass) {
    errors.payPass = '请填写支付密码。';
  } else if (!passwordRegex.test(payPass)) {
    errors.payPass = '密码必须包含字母和数字组合，长度至少 8 位。';
  } else if (loginPass === payPass) {
    errors.payPass = '支付密码不得与登录密码相同。';
  }
  return errors;
};

const asyncValidate = async (values) => {
  if (!values.userName) {
    return { userName: '请输入用户名。' };
  }
  try {
    let res = await ajax.get('/api/account/check_username', {
      userName: values.userName
    });
    return {};
  } catch (err) {
    if (err.type === 'USERNAME_EXIST') {
      return { userName: '该用户名已被注册。' };
    } else {
      return { userName: '暂时无法连接服务器。' };
    }
  }
};

@connect(
  (state) => ({
    registering: state.account.registering,
    errorMsg: state.account.errorMsg
  })
)
@reduxForm({
  form: 'user-register',
  fields: ['userName', 'loginPass', 'payPass'],
  asyncValidate,
  asyncBlurFields: [ 'userName' ],
  validate
}, undefined, {
  onSubmit: (data) => register(data)
})
class RegisterForm extends React.Component {

  componentWillUnmount() {
    this.props.resetForm();
  }

  render() {
    const {
      asyncValidating,
      fields: {
        userName,
        loginPass,
        payPass
      },
      /* resetForm ,*/
      handleSubmit
      /* submitting */} = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 2 }}
                   wrapperCol={{ span: 22 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}}
                                type="user" />}
                   help={userName.touched && userName.error ?
                         userName.error : '　'}
                   hasFeedback={userName.touched}
                   validateStatus={
                     asyncValidating === 'userName' ? 'validating' :
                     userName.touched && userName.error ? 'error' : 'success' }>
          <Input size="large"
                 placeholder="用户名"
                 autoFocus
                 autoComplete="off"
                 {...userName} />
        </Form.Item>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 2 }}
                   wrapperCol={{ span: 22 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}}
                                type="lock" />}
                   help={loginPass.touched && loginPass.error ?
                         loginPass.error : '　'}
                   hasFeedback={loginPass.touched}
                   validateStatus={loginPass.touched && loginPass.error ?
                                   'error' : 'success'}>
          <Input size="large"
                 type="password"
                 placeholder="账户密码"
                 {...loginPass} />
        </Form.Item>
        <Form.Item className={styles.formItem}
                   labelCol={{ span: 2 }}
                   wrapperCol={{ span: 22 }}
                   label={<Icon style={{fontSize: 15, marginRight: 4}}
                                type="pay-circle-o" />}
                   help={payPass.touched && payPass.error ?
                         payPass.error :  '　'}
                   hasFeedback={payPass.touched}
                   validateStatus={payPass.touched && payPass.error ?
                                   'error' : 'success'}>
          <Input size="large"
                 type="password"
                 placeholder="支付密码"
                 {...payPass} />
        </Form.Item>
        <div className={styles.hint}>{this.props.errorMsg ?
                                      this.props.errorMsg : '　'}</div>
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
