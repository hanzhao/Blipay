import React from 'react';

import SecurityRow from '../SecurityRow';

import styles from './styles';

const contents = [
  {title: '账户密码', brief: '账户密码用于登录您的账户', button: '修改', onClick: null},
  {title: '支付密码', brief: '支付密码用于保障交易安全', button: '修改', onClick: null},
  {title: '邮箱验证', brief: '您尚未进行邮箱验证', button: '验证', onClick: null}
];

class AccountSecurityPage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.horizontalBar}/>
        {
          contents.map((c) => (
            <div>
              <SecurityRow content={c}/>
              <div className={styles.horizontalBar}/>
            </div>
          ))
        }
      </div>);
  }
}

export default AccountSecurityPage;
