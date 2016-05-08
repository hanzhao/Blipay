/*
 * 填写表单的提示框，包含三个输入框、一个确认按钮。用于修改密码、账户充值、提现。
 *
 * 该组件需要以下props：
 * visible: 【必需】是否显示该Modal
 * num: 【必需】输入框的数量
 * title: 【可选】该Modal的标题
 * propsArray: 【必需】将传递给每一项的props，其形式为
 *              [{
 *                input: {},
 *                field: {['fieldname', { rules: [] }]},
 *                item:{}
 *              }, ... ]。
 * 其中input项为传递给输入框的props，field将作为参数传递给getFieldProps，
 * item项将作为props传递给Form.Item。其中input和item为可选项。
 * btnProps: 【可选】将传递给按钮的props
 * btnText: 【必需】按钮的提示文字
 */
import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import styles from './styles';

const FormItem = Form.Item;

class FormModal extends React.Component {

  propTypes: {
    num: React.PropTypes.number.isRequired,
    visible: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string,
    propsArray: React.PropTypes.array.isRequired,
    btnProps: React.PropTypes.object,
    btnText: React.PropTypes.string.isRequired
  }

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

  render() {
    const { getFieldProps
            /*, getFieldError, isFieldValidating */ } = this.props.form;
    const num = this.props.num;
    /* 使用空对象填充propsArray */
    const propsArray = Array(num).fill(0).map((e, i) => ({
      input: this.props.propsArray[i].input || {},
      item: this.props.propsArray[i].item || {},
      field: this.props.propsArray[i].field
    }));
    const btnProps = this.props.btnProps || {};

    return (
      <Modal visible={this.props.visible}
             width="400px"
             title={this.props.title}
             footer={null}
             onCancel={this.props.toggleModal}>
        <Form className={styles.form} >
          {
            /* 生成输入框 */
            propsArray.map((e, i) => (
              <FormItem key={i}
                        className={styles.formItem}
                        hasFeedback {...e.item}
                        validateStatus={this.getValidateStatus(...e.field)}>
                <Input className={styles.input}
                       {...(getFieldProps(...e.field))}
                       {...e.input} />
              </FormItem>
            ))
          }
        </Form>
        <Button className={styles.confirm}
                type="primary" {...btnProps}>
          {this.props.btnText}
        </Button>
      </Modal>
    );
  }
}

/* eslint-disable */
/* 官方示例写法*/
FormModal = Form.create({})(FormModal);
/* eslint-enable */

export default FormModal;
