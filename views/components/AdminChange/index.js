/*
 * Admin 修改用户信息
 */
import React from 'react';
import { Col, Input, Button } from 'antd';
import styles from './styles';

class AdminChange extends React.Component {
  render() {
    return (
      <div>
      <div className={styles.container}>
        <div className={styles.topmod}>
          <span className={styles.searchtext}>用户帐号搜索</span>
          <div className={styles.search}>
           <Col span="5">
            <Input id="search" placeholder="请输入用户名或身份号码" />
           </Col>
          </div>
        </div>
      </div>
      <div className={styles.under}>
        <p className={styles.user}>
          <span className={styles.searchtext}>登录名</span>
          <div className={styles.search}>
           <Col span="8">
            <Input id="user" placeholder="potaty" />
           </Col>
          </div>
        </p>
        </div>
        <div className={styles.under}>
          <p className={styles.passwd}>
            <span className={styles.searchtext}>密码</span>
            <div>
             <Col span="8">
              <Input id="passwd" placeholder="如需改密码 请输入新密码" />
             </Col>
            </div>
          </p>
        </div>
        <div className={styles.under}>
          <p className={styles.mobile}>
            <span className={styles.searchtext}>手机号</span>
            <div>
             <Col span="8">
              <Input id="mobile" placeholder="13027273737" />
             </Col>
            </div>
          </p>
        </div>
        <div className={styles.under}>
          <Button> 确认修改 </Button>
        </div>
      </div>
    );
  }
}

export default AdminChange;
