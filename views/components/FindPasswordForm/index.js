/*
 * 找回密码界面
 */

import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button } from 'antd';
import { findPassword } from '../../redux/modules/account';
import styles from './styles';

@connect(
  (state) => ({
    findRes: state.account.findRes
  }), {
    findPassword
  }
)
@Form.create({})
class FindPasswordForm extends React.Component {

  handleSubmit = () => {
    this.props.findPassword(this.props.form.getFieldsValue());
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal>
        <Form.Item>
          <Input size="large"
                 placeholder="账户"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off"
                 {...getFieldProps('userName')}/>
        </Form.Item>
        <Form.Item>
          <Input size="large"
                 placeholder="邮箱地址"
                 addonBefore={<Icon type="mail" />}
                 autoComplete="off"
                 {...getFieldProps('email')}/>
        </Form.Item>
        <div className={styles.hint}>{this.props.findRes}</div>
        <Button type="primary" size="large"
                className={styles.btn}
                onClick={this.handleSubmit} >
          找回密码
        </Button>
        <div className={styles.bottomRight}>
          <a onClick={this.props.handleSwitchPanel.bind(this, 1)}>
            登录账户 <Icon type="right" />
          </a>
        </div>
      </Form>
    );
  }
}

export default FindPasswordForm;
