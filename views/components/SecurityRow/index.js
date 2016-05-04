/*
 * “安全设置”页面中每一个横向部分对应的组件。
 */
import React from 'react';

import styles from './styles';

class SecurityRow extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>{ this.props.content.title }</div>
        <div className={styles.brief}>{ this.props.content.brief }</div>
        <a className={styles.button} onClick={this.props.content.onClick}>{ this.props.content.btnText }</a>
      </div>
    );
  }
}

export default SecurityRow;
