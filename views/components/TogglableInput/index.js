/*
 * “基本信息“页面每一项中供用户修改的部分。
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Input, Icon, Form } from 'antd';

import styles from './styles';

const FormItem = Form.Item;

@Form.create({})
class TogglableInput extends React.Component {
  state = {
    editing: false
  };

  handleEdit = () => {
    this.setState({ editing: true }, () => {
      /* 自动全选所有输入文本框中的内容 */
      /*
      ReactDOM.findDOMNode(this.refs.input)
              .getElementsByTagName('input')[0]
              .select();
      */
    });
  };

  handleCancel = () => {
    this.setState({ editing: false });
  };

  handleSubmit = () => {
    this.props.callback(this.props.form.getFieldsValue());
    this.setState({ editing: false })
  };

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
    const { getFieldProps } = this.props.form;
    const field = this.props.field;
    return (
      <span>
        { this.state.editing &&
          <span className={styles.row}>
            <Form inline className={styles.form}>
              <FormItem className={styles.formItem}
                        hasFeedback 
                        validateStatus={this.getValidateStatus(...field)}>
                <Input ref="input" className={styles.input}
                       defaultValue={this.props.defaultValue}
                       autoFocus {...getFieldProps(...field)}/>
              </FormItem>
            </Form>
            <Button className={styles.button} 
                    type="primary" 
                    onClick={this.handleSubmit}
                    disabled={this.getValidateStatus(...field) === 'error'}>
              保存
            </Button>
            <a className={styles.cancel} onClick={this.handleCancel}>取消</a>
          </span>    
        }
        { !this.state.editing &&
          <span className={styles.row}>
            <span className={styles.title}>{this.props.defaultValue}</span>
            <a className={styles.edit} onClick={this.handleEdit}>
              <Icon type='edit' className={styles.icon}/>
              <span>{this.props.defaultValue ? '修改' : '填写'}</span>
            </a>
          </span>
        }
      </span>
    );
  }
}

export default TogglableInput;
