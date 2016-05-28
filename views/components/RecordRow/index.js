/*
 * “交易记录”页面中每一行对应的组件
 */
import React from 'react';
import classNames from 'classnames';

import styles from './styles';

class RecordRow extends React.Component {
  render() {
    const rowClass = classNames({
      [styles.row]: true,
      [styles.inverse]: this.props.inverse
    });
    return (
      <tr className={rowClass}>
        <td className={styles.date}>{ this.props.record['date'] }</td>
        <td className={styles.name}>{ this.props.record['name'] }</td>
        <td className={styles.amount}>{ this.props.record['amount'] }</td>
        <td className={styles.status}>{ this.props.record['status'] }</td>
      </tr>
    );
  }
}

export default RecordRow;
