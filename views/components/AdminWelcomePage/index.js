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
import { getAdminLog } from '../../redux/modules/admin';


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

const getLevelDetail = (level) => {
  switch (level) {
    case 0:
      return '超级管理员'
    case 1:
      return '普通管理员'
    default:
      return '未知权限'
  }
}

const tableProps = {
  pagination: false
};

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(getAdminLog());
    }
  }],
  (state) => ({
    admin: state.admin.admin,
    adminLog: state.admin.adminLog
  }),
  (dispatch) => ({
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
    const { admin, adminLog } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.upperHalf}>
          <div className={styles.info}>
            <div className={styles.greeting}>{admin.realName}，晚上好！</div>
            <div className={styles.lastLogin}>
              上次登录时间：2016.05.11 12:00
            </div>
          </div>
          <div className={styles.verticalBar}/>
          <div className={styles.level}>
            <div className={styles.levelTitle}>您的权限等级为</div>
            <div className={styles.levelLower}>
              <div className={styles.levelValue}>
                { getLevelDetail(admin.level) }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.horizontalBar}/>
        <div className={styles.lowerHalf}>
          <div className={styles.title}>最近操作记录</div>
          <div className={styles.tableWrapper}>
            <AccountRecordTable data={adminLog} tableProps={tableProps}/>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountWelcomePage;
