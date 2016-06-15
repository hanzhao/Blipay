/** 购物 添加商品 */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, Input, Row, Col, Button, InputNumber,
          Upload, Icon, Modal, DatePicker, Alert, message } from 'antd';

import Container from '../Container';
import ShoppingPageHeader from '../ShoppingPageHeader';
import ShoppingMenu from '../ShoppingMenu';
import {
  addItem
} from '../../redux/modules/shopping';

import styles from './styles';

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 10 },
};

const validate = (values) => {
  const errors = {}
  if (!values.name) {
    errors.name = '商品名不能为空'
  }
  if (values.name && values.name.length > 30) {
    errors.name = '商品名不能大于 30 个字'
  }
  if (!values.description) {
    errors.description = '请描述一下你的商品信息'
  }
  if (values.description && values.description.length > 250) {
    errors.description = '商品描述不能大于 250 个字'
  }
  if (!values.photo || values.photo.length === 0) {
    errors.photo = '请上传商品照片'
  }
  return errors;
}

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

@connect(
  (state) => ({
    status: state.account.user && state.account.user.status
  })
)
@reduxForm({
  form: 'shopping-add-item',
  fields: ['name', 'price', 'remain', 'photo', 'description'],
  validate
}, (state) => ({
  initialValues: {
    price: 10.00,
    remain: 1,
    photo: []
  }
}), {
  onSubmit: (data) => addItem(data)
})
class ShoppingAddItemForm extends React.Component {
  handleChange = ({ file, fileList }) => {
    switch (file.status) {
      case 'done':
        message.success('成功上传了一张图片')
        break
      case 'error':
        message.error(file.response.error)
        break
      default:
        // ???
        break
    }
    // connect reduxForm
    return this.props.fields.photo.onChange(fileList)
  }
  render() {
    const { fields: { name, price, remain, description, photo },
             handleSubmit, resetForm, status } = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <div className={styles.alert}>
          { status !== 2 &&
            <Alert message="尚未通过实名验证"
                   description="为了保证平台用户的权益，Blipay 不允许未通过实名验证的用户发布商品。"
                   type="error" />
          }
        </div>
        <Form.Item label="商品名：" hasFeedback
          {...getValidate(name)} {...formItemLayout}>
          <Input placeholder="请输入商品名" {...name} />
        </Form.Item>
        <Form.Item label="商品价格：" hasFeedback {...formItemLayout}>
          <InputNumber className={styles.priceInput}
                       min={0} step={1} {...price} />
          <span className="ant-form-text"> 元</span>
        </Form.Item>
         <Form.Item label="商品库存：" hasFeedback {...formItemLayout}>
          <InputNumber className={styles.storageInput}
                       min={0} step={1} {...remain} />
          <span className="ant-form-text"> 件</span>
        </Form.Item>
        <Form.Item label="商品描述："
          {...formItemLayout} {...getValidate(description)}>
          <Input type="textarea" placeholder="请输入商品介绍" {...description} />
        </Form.Item>
        <Form.Item label="商品照片：" {...formItemLayout} {...getValidate(photo)}>
          <Upload action="/api/photo/new"
                  listType="picture"
                  accept="image/*"
                  {...photo}
                  onChange={this.handleChange}>
            <Button type="ghost">
              <Icon type="upload" /> 点击上传照片
            </Button>
          </Upload>
        </Form.Item>
        <div className={styles.buttonContainer}>
          <Button className={styles.buttonSummit} type="primary"
                  htmlType="submit" disabled={status !== 2}>
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

class ShoppingItemAdd extends React.Component {
  render() {
      return (
        <div>
          <ShoppingPageHeader icon="plus-circle-o" text="添加商品" />
          <ShoppingAddItemForm />
        </div>
      );
  }
}
export default ShoppingItemAdd;
