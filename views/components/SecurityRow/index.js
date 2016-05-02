import React from 'react';

import styles from './styles';

class SecurityRow extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.title}>{ this.props.content['title'] }</div>
        <div className={styles.brief}>{ this.props.content['brief'] }</div>
        <a className={styles.button}>{ this.props.content['button'] }</a>
      </div>
    );
  }
}

export default SecurityRow;