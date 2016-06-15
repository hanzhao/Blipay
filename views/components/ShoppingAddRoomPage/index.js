import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd';

import Container from '../Container';
import ShoppingPageHeader from '../ShoppingPageHeader';
import {
  addRoom
} from '../../redux/modules/shopping';

import styles from './styles';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const validate = (values) => {
  const errors = {};
  const { name, price, description } = values;
  if (!name) {
    errors.name = '请填写房间名';
  }
  if (!price) {
    errors.price = '请填写价格';
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
  form: 'shopping-add-room',
  fields: ['name', 'price', 'description'],
  validate
}, undefined, {
  onSubmit: (data) => addRoom(data)
})
class ShoppingAddRoomForm extends React.Component {
  render() {
    const { fields: { name, price, description },
             handleSubmit, resetForm, status } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <Form.Item label="房型名：" hasFeedback
          {...getValidate(name)} {...formItemLayout}>
          <Input placeholder="请输入房型名" {...name} />
        </Form.Item>
        <Form.Item label="房间价格：" hasFeedback
          {...getValidate(price)} {...formItemLayout}>
          <InputNumber min={1} max={5000} step={1} {...price} />
          <span>元 / 日</span>
        </Form.Item>
        <Form.Item label="房间描述（可选）：" hasFeedback
          {...getValidate(description)} {...formItemLayout}>
          <Input type="textarea" placeholder="请输入房间描述" {...description} />
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

class ShoppingAddRoomPage extends React.Component {
  render() {
      return (
        <div>
          <ShoppingPageHeader icon="plus-circle-o" text="添加房间" />
          <ShoppingAddRoomForm />
        </div>
      );
  }
}
export default ShoppingAddRoomPage;
