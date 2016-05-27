/*
 * Admin 修改用户信息
 */
import React from 'react';
import { Col, Input } from 'antd';
import styles from './styles';

class AdminChange extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.topmod}>
          <span className={styles.searchtext}>用户帐号搜索</span>
          <div className={styles.search}>
           <Col span="5">
            <Input id="defaultInput" placeholder="请输入用户名或身份号码" />
           </Col>
          </div>
        </div>
        <div className={styles.form}>
        <div className={styles.topmod}>
          <span className={styles.searchtext}>用户帐号搜索</span>
          <div className={styles.search}>
           <Col span="5">
            <Input id="defaultInput" placeholder="请输入用户名或身份号码" />
           </Col>
          </div>
        </div>
        <div className={styles.topmod}>
          <span className={styles.searchtext}>用户帐号搜索</span>
          <div className={styles.search}>
           <Col span="5">
            <Input id="defaultInput" placeholder="请输入用户名或身份号码" />
           </Col>
          </div>
        </div>
        <div className={styles.topmod}>
          <span className={styles.searchtext}>用户帐号搜索</span>
          <div className={styles.search}>
           <Col span="5">
            <Input id="defaultInput" placeholder="请输入用户名或身份号码" />
           </Col>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default AdminChange;
