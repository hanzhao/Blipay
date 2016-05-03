/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react';

import { Button } from 'antd';
import styles from './styles';

class AccountWelcomePage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.upperHalf}>
          <div className={styles.info}>
            <div className={styles.greeting}>下午好，XXX</div>
            <div className={styles.lastLogin}>
              上次登录时间<br/>2015.01.01 12:00
            </div>
          </div>
          <div className={styles.verticalBar}/>
          <div className={styles.balance}>
            <div className={styles.balanceTitle}>账户余额</div>
            <div className={styles.balanceLower}>
              <span className={styles.balanceHead}>￥0.</span>
              <span className={styles.balanceTail}>00</span>
              <Button className={styles.topup}>充值</Button>
              <Button className={styles.withdrawal}>提现</Button>
            </div>
          </div>
        </div>
        <div className={styles.horizontalBar}/>
        <div className={styles.lowerHalf}>
          <div className={styles.title}>交易记录</div>
          <table className={styles.table}>
            <tr className={styles.row}>
              <td className={styles.date}>2015.01.01</td>
              <td className={styles.description}>账户充值</td>
              <td className={styles.amount}>+100.00</td>
              <td className={styles.status}>交易成功</td>
            </tr>
          </table>
        </div>
      </div>);
  }
}

export default AccountWelcomePage;
