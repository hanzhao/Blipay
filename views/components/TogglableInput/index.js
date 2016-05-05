/*
 * “基本信息“页面每一项中供用户修改的部分。
 */
import React from 'react';
import ReactDOM from 'react-dom';

import { Button, Input, Icon } from 'antd';

import styles from './styles';

class TogglableInput extends React.Component {
  state = {
    editing: false
  };
  handleEdit = () => {
    this.setState({ editing: true }, () => {
      /* 自动全选所有输入文本框中的内容 */
      ReactDOM.findDOMNode(this.refs.input)
              .getElementsByTagName('input')[0]
              .select();
    });
  };
  handleCancel = () => {
    this.setState({ editing: false });
  }
  render() {
    return (
      <span>
        { this.state.editing &&
          <span className={styles.row}>
            <Input ref="input" className={styles.input}
                   defaultValue={this.props.defaultValue}
                   autoFocus />
            <Button className={styles.button} type="primary">保存</Button>
            <a className={styles.cancel} onClick={this.handleCancel}>取消</a>
          </span>
        }
        { !this.state.editing &&
          <span className={styles.row}>
            <span className={styles.title}>{this.props.defaultValue}</span>
            <a className={styles.edit} onClick={this.handleEdit}>
              <Icon type='edit' className={styles.icon}/>
              <span>填写</span>
            </a>
          </span>
        }
      </span>
    );
  }
}

export default TogglableInput;
