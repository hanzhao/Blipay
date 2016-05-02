import React from 'react';

import styles from './styles';

class RecordRow extends React.Component {
  render() {
    return (
      <tr className={styles.row} style={{ background: this.props.background }}>
        <td className={styles.date}>{ this.props.record['date'] }</td>
        <td className={styles.name}>{ this.props.record['name'] }</td>
        <td className={styles.amount}>{ this.props.record['amount'] }</td>
        <td className={styles.status}>{ this.props.record['status'] }</td>
      </tr>);
  }
}

export default RecordRow;
