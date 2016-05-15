import React from 'react';
import Container from '../Container';
import ShoppingMenu from '../ShoppingMenu';
import { Form, Input, Row, Col, Button,  InputNumber,DatePicker } from 'antd';
import { Upload, Icon, Modal } from 'antd';
import styles from './styles';
const FormItem = Form.Item;
const createForm = Form.create;

function noop() {
  return false;
}
function onChangePrice(value)
{
	 console.log('changed', value);
}
function getAddress(value)
{
	return value;
}
var props = {
  action: '/upload.do',
  listType: 'picture',
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
    thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
  },],
};
let BasicDemo = React.createClass({
  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  },

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  },

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  },

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  },

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  },

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '商品名至少为 5 个字符' },
      ],
    });
    const priceProps = getFieldProps('price', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }],
    });
    const storeProps = getFieldProps('store', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }],
    });
    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2,
      }],
    });
    const textareaProps = getFieldProps('textarea', {
      rules: [
        { required: true, message: '真的不打算写点什么吗？' },
      ],
    });
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
    };
    return (
      
      <Form horizontal form={this.props.form}>
        <FormItem
          {...formItemLayout}
          label="商品名："
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
          <Input {...nameProps} placeholder="请输入商品名" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="商品价格："
          hasFeedback>
          <InputNumber className={styles.priceInput} min={0} step={0.01} {...priceProps} type="price" placeholder="请输入商品价格" />
        </FormItem>

     	<FormItem
          {...formItemLayout}
          label="商品库存："
          hasFeedback>
          <InputNumber className={styles.storageInput}  min={0} step={1} {...storeProps} type="store" placeholder="请输入商品库存" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="商品介绍：">
          <Input {...textareaProps} type="textarea" placeholder="请输入商品介绍" id="textarea" name="textarea" />
          <Input/>
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Upload {...props}>
              <Button type="ghost">
              <Icon type="upload" /> 点击上传照片
              </Button>
          </Upload>
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <span>
          <Button className={styles.buttonSummit} type="primary" onClick={this.handleSubmit}>确定</Button>
          <Button className={styles.buttonReset} type="ghost" onClick={this.handleReset}>重置</Button>
          </span>
        </FormItem>

      </Form>
    );
  },
});


BasicDemo = createForm()(BasicDemo);

class ShoppingItemAdd extends React.Component {
  render() {
  		return (
  			<BasicDemo />
  		);
  }
}
export default ShoppingItemAdd;