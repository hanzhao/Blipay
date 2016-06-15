import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd';

import Container from '../Container';
import AdminPageHeader from '../AdminPageHeader';
import {
  addUser
} from '../../redux/modules/admin';

import styles from './styles';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validate = (values) => {
  const errors = {};
  const { userName, realName, password, repassword, address } = values;
  if (!userName) {
    errors.userName = '请填写用户名';
  }
  if (!realName) {
    errors.realName = '请填写单位名';
  }
  if (!address) {
    errors.address = '请填写单位地址';
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

@reduxForm({
  form: 'admin-add-booker',
  fields: ['userName', 'password', 'repassword', 'realName', 'address'],
  validate
}, undefined, {
  onSubmit: (data) => addUser({ ...data, booker: 1 })
})
class AdminAddBookerForm extends React.Component {
  render() {
    const { fields: { userName, realName, password, repassword, address },
             handleSubmit, resetForm, status } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item label="用户名：" hasFeedback
          {...getValidate(userName)} {...formItemLayout}>
          <Input placeholder="请输入票务管理员用户名" {...userName} />
        </Form.Item>
        <Form.Item label="单位名：" hasFeedback
          {...getValidate(realName)} {...formItemLayout}>
          <Input placeholder="请输入票务管理员单位名" {...realName} />
        </Form.Item>
        <Form.Item label="单位地址：" hasFeedback
          {...getValidate(address)} {...formItemLayout}>
          <Input placeholder="请输入票务管理员单位地址" {...address} />
        </Form.Item>
        <Form.Item label="密码：" hasFeedback
          {...getValidate(password)} {...formItemLayout}>
          <Input placeholder="请输入票务管理员密码"
                 type="password" {...password} />
        </Form.Item>
        <Form.Item label="重复密码：" hasFeedback
          {...getValidate(repassword)} {...formItemLayout}>
          <Input placeholder="请重新输入票务管理员密码"
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

class AdminAddBookerPage extends React.Component {
  render() {
      return (
        <div>
          <AdminPageHeader icon="plus-circle-o" text="添加票务管理员" />
          <AdminAddBookerForm />
        </div>
      );
  }
}
export default AdminAddBookerPage;
