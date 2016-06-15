/** 添加管理员页面 */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd';

import Container from '../Container';
import AdminPageHeader from '../AdminPageHeader';
import {
  addAdmin
} from '../../redux/modules/admin';

import styles from './styles';

/** 样式 */
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

/** 表单校验 */
const validate = (values) => {
  const errors = {};
  const { adminName, realName, password, repassword } = values;
  if (!adminName) {
    errors.adminName = '请填写用户名';
  }
  if (!realName) {
    errors.userName = '请填写真实姓名';
  }
  if (!password) {
    errors.password = '请填写登录密码';
  } else if (!passwordRegex.test(password)) {
    errors.password = '密码必须包含字母和数字组合，长度至少 8 位';
  }
  if (!repassword) {
    errors.repassword = '请重复填写登录密码'
  } else if (repassword !== password) {
    errors.repassword = '两次输入不一致'
  }
  return errors;
};

function getValidate(item) {
  if (!item.touched) {
    return {}
  } else if (!item.error) {
    return {
      validateStatus: 'success'
    }
  } else {
    return {
      validateStatus: 'error',
      help: item.error
    }
  }
}

/** 主页面 */
@reduxForm({
  form: 'admin-add-admin',
  fields: ['adminName', 'password', 'repassword', 'realName'],
  validate
}, undefined, {
  onSubmit: (data) => addAdmin(data)
})
class AdminAddAdminForm extends React.Component {
  render() {
    const { fields: { adminName, realName, password, repassword },
             handleSubmit, resetForm, status } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item label="用户名：" hasFeedback
          {...getValidate(adminName)} {...formItemLayout}>
          <Input placeholder="请输入管理员用户名" {...adminName} />
        </Form.Item>
        <Form.Item label="真实姓名：" hasFeedback
          {...getValidate(realName)} {...formItemLayout}>
          <Input placeholder="请输入管理员真实姓名" {...realName} />
        </Form.Item>
        <Form.Item label="密码：" hasFeedback
          {...getValidate(password)} {...formItemLayout}>
          <Input placeholder="请输入管理员密码"
                 type="password" {...password} />
        </Form.Item>
        <Form.Item label="重复密码：" hasFeedback
          {...getValidate(repassword)} {...formItemLayout}>
          <Input placeholder="请重新输入管理员密码"
                 type="password" {...repassword} />
        </Form.Item>
        <div className={styles.buttonContainer}>
          <Button className={styles.buttonSummit} type="primary"
                  htmlType="submit">
            确定
          </Button>
          <Button className={styles.buttonReset} type="ghost"
                  onClick={resetForm}>
            重置
          </Button>
        </div>
      </Form>
    );
  }
}

class AdminAddAdminPage extends React.Component {
  render() {
      return (
        <div>
          <AdminPageHeader icon="plus-circle-o" text="添加管理员" />
          <AdminAddAdminForm />
        </div>
      );
  }
}
export default AdminAddAdminPage;
