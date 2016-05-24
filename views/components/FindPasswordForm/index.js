/*
 * 找回密码界面
 */

import React from 'react';
import { Form, Input, Icon, Button } from 'antd';

import styles from './styles';

const fields = {
  account: 'account',
  email: 'email',
};

const translate = (text) => {
  return text;
};

@Form.create({})
class FindPasswordForm extends React.Component {

  getValidateStatus = (field) => {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  };

  handleSubmit = () => {

  };
  
  render() {
    const { getFieldProps, isFieldValidating, getFieldError } = this.props.form;
    return (
      <Form horizontal>
        <Form.Item hasFeedback
                   validateStatus={this.getValidateStatus(fields.account)}
                   help={isFieldValidating(fields.account) ? '　' : 
                         translate(getFieldError(fields.account))}>
          <Input size="large"
                 placeholder="账户"
                 addonBefore={<Icon type="user" />}
                 autoFocus
                 autoComplete="off" />
        </Form.Item>
        <Form.Item hasFeedback
                   validateStatus={this.getValidateStatus(fields.email)}
                   help={isFieldValidating(fields.email) ? '　' : 
                         translate(getFieldError(fields.email))}>
          <Input size="large"
                 placeholder="邮箱地址"
                 addonBefore={<Icon type="mail" />}
                 autoComplete="off" />
        </Form.Item>
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
