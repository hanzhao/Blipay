/*
 * “个人账户”页面中“基本信息”选项对应的右侧方框。
 */
import React from 'react';

import TogglableInput from '../TogglableInput';

import styles from './styles';

const items = [
  { title: '昵称', display: '老王' },
  { title: '真实姓名', display: '王思聪' },
  { title: '身份证号', display: '51234198002011234' },
  { title: '邮箱地址', display: 'xxx@xxx.com' },
  { title: '手机/电话', display: '13000000000' }
];

class AccountInfoPage extends React.Component {
  render() {
    return (
      <div className={styles.container}>{/* 外边框 */}
        <div className={styles.mainTitle}>修改个人资料</div>{/* 标题 */}
        { 
          Array(items.length*2).fill(0).map((e, i) => {
            if (i % 2 === 0) {
              return (
                <div key={i} className={styles.horizontalBar}/>/* 分割线 */
              );
            } else {
              let k = (i - 1) / 2;
              return (
                <div key={i} className={styles.row}>
                  <div className={styles.editTitle}>{ items[k].title }</div>{/* 每一项前的名称 */}
                  <TogglableInput defaultValue={items[k].display} />
                </div>
              );
            }
          })
        }
      </div>);
  }
}

export default AccountInfoPage;
