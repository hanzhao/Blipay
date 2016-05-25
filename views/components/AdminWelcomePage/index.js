/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { Button } from 'antd';
import AccountRecordTable from '../managementrecord';
import FormModal from '../managementformmodel';
import styles from './styles';
import store from '../../redux/store';
import ajax from '../../common/ajax';



/* 示例validator */
const validateCard = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    /* 在timeout前输入框将处于validating状态 */
    setTimeout(() => {
      /* 出现错误只需按以下方式调用callback */
      callback([new Error()]);
    }, 1000);
  }
};


/* 以下是本页所能显示交易记录的最大数目 */
const fakeData = Array(Math.floor((window.innerHeight - 450) / 50)).fill({
  date: '2015.01.01 19:08:32',
  description: '删除管理员帐号',
  amount : '梁露',
  status: '删除帐号: woot'
});

const tableProps = {
  pagination: false
};

@connect(
  (state) => ({
    user: state.admin.user
  })
)

class AccountWelcomePage extends React.Component {
  state = {
    showTopup: false,
    showWithdrawal: false
  };
  toggleTopup = () => {
    this.setState({
      showTopup: !this.state.showTopup
    });
  };
  toggleWithDrawal = () => {
    this.setState({
      showWithdrawal: !this.state.showWithdrawal
    });
  };
  render() {
    const { user } = this.props;
    console.log("admin:"+user);
    return (
      <div className={styles.container}>
        <div className={styles.upperHalf}>
          <div className={styles.info}>
            <div className={styles.greeting}>{user.realName}，晚上好！</div>
            <div className={styles.lastLogin}>
              上次登录时间：2016.05.11 12:00
            </div>
          </div>
          <div className={styles.verticalBar}/>
          <div className={styles.balance}>
            <div className={styles.balanceTitle}>您的权限等级为{user.level}</div>
            <div className={styles.balanceLower}>
              <div className={styles.balanceValue}>
                <span className={styles.balanceHead}>{user.level==0?"超级管理员":
                                                      (user.level==1?"订票管理员":
                                                        (user.level==2? "审计员":"高级管理员"))}</span>
              </div>
              <div className={styles.balanceOperation}>
                <Link to="/admin/account/manager">
                  <Button className={styles.topup}>
                 编辑管理员
                 </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.horizontalBar}/>
        <div className={styles.lowerHalf}>
          <div className={styles.title}>最近操作记录</div>
          <div className={styles.tableWrapper}>
            <AccountRecordTable data={fakeData} tableProps={tableProps}/>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountWelcomePage;
