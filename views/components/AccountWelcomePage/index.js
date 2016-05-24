/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react';
import _ from 'lodash';
import { asyncConnect } from 'redux-connect';
import { Button } from 'antd';
import AccountRecordTable from '../AccountRecordTable';
import FormModal from '../FormModal';
import styles from './styles';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import moment from 'moment'
import {
  logout,
  toggleTopup,
  toggleWithdraw,
  loadTransactions,
  topup,
  withdraw
} from '../../redux/modules/account';

const validateTopupAmount = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    try {
      JSON.parse(value);
    } catch(err) {
      callback(new Error('请输入有效数字。'));
    }
    if (value.length > 12) {
      callback(new Error('输入金额过大。'));
    } else if (!isNaN(value) && JSON.parse(value) > 0) {
      callback();
    } else {
      callback(new Error('输入金额不合法。'));
    }
  }
};

const validateWithdrawAmount = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    try {
      JSON.parse(value);
    } catch(err) {
      callback(new Error('请输入有效数字。'));
    }
    if (value.length > 12) {
      callback(new Error('输入金额过大。'));
    } else if (JSON.parse(value) > store.getState().account.user.balance) {
      callback(new Error('提现金额超过余额。'));
    } else if (!isNaN(value) && JSON.parse(value) > 0) {
      callback();
    } else {
      callback(new Error('输入金额不合法。'));
    }
  }
};

const validatePaypass = async (rule, value, callback) => {
  try {
    const res = await ajax.post('/api/account/check_paypass', {
      payPass: value
    });
    callback();
  } catch (err) {
    callback(new Error(err.type));
  }
};

const validateCard = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (/^\d{16,19}/.test(value)) {
      callback();
    } else {
      callback(new Error('银行卡号格式不正确。'));
    }
  }
};

const withdrawalPropsArray = [
  {
    input: {
      placeholder: '请输入银行卡号',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'card', {
        rules: [{ required: true }, { validator: validateCard }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入提现金额',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'amount', {
        rules: [{ required: true }, { validator: validateWithdrawAmount }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'password', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: validatePaypass }]
      }
    ]
  }
];

const topupPropsArray = [
  {
    input: {
      placeholder: '请输入银行卡号',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'card', {
        rules: [{ required: true }, { validator: validateCard }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入充值金额',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'amount', {
        rules: [{ required: true }, { validator: validateTopupAmount }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'password', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: validatePaypass }]
      }
    ]
  }
];

const tableProps = {
  pagination: false
};

const getBalanceHead = (balance) => {
  if (isNaN(balance))
    return '0';
  else
    return (balance.toFixed(2) + '').split('.')[0];
};

const getBalanceTail = (balance) => {
  if (isNaN(balance))
    return '00';
  else
    return (balance.toFixed(2) + '').split('.')[1];
};

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadTransactions())
    }
  }],
  (state) => ({
    user: state.account.user,
    transactions: _.reverse(_.slice(state.account.transactions)),
    showTopupModal: state.account.showTopupModal,
    showWithdrawModal: state.account.showWithdrawModal
  }),
  (dispatch) => ({
    toggleTopup: () => dispatch(toggleTopup()),
    toggleWithdraw: () => dispatch(toggleWithdraw()),
    logout: () => dispatch(logout()),
    handleTopup: (data) => dispatch(topup(data)),
    handleWithdraw: (data) => dispatch(withdraw(data)),
  })
)
class AccountWelcomePage extends React.Component {
  render() {
    const { user, transactions } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.upperHalf}>
          <div className={styles.info}>
            <div className={styles.greeting}>下午好，{user.realName || user.userName}！</div>
            <div className={styles.lastLogin}>
              上次登录时间：{
                user.lastLogin ?
                moment(user.lastLogin).format('LL') : '很久很久以前'
              }
            </div>
            <a className={styles.logout} onClick={this.props.logout}>注销</a>
          </div>
          <div className={styles.verticalBar}/>
          <div className={styles.balance}>
            <div className={styles.balanceTitle}>账户余额</div>
            <div className={styles.balanceLower}>
              <div className={styles.balanceValue}>
                <span className={styles.balanceHead}>
                  ￥{ getBalanceHead(user.balance) }.
                </span>
                <span className={styles.balanceTail}>
                  { getBalanceTail(user.balance) }
                </span>
              </div>
              <div className={styles.balanceOperation}>
                <Button className={styles.topup}
                        onClick={this.props.toggleTopup}>
                  充值
                </Button>
                <Button className={styles.withdrawal}
                        onClick={this.props.toggleWithdraw}>
                  提现
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.horizontalBar}/>
        <div className={styles.lowerHalf}>
          <div className={styles.title}>最近交易</div>
          <div className={styles.tableWrapper}>
            <AccountRecordTable
              data={transactions.slice(0, 10)}
              tableProps={tableProps}/>
          </div>
        </div>
        <FormModal title="账户充值"
                   visible={this.props.showTopupModal}
                   num={3}
                   btnText="确认充值"
                   propsArray={topupPropsArray}
                   btnCallback={this.props.handleTopup}
                   toggleModal={this.props.toggleTopup} />
        <FormModal title="账户提现"
                   visible={this.props.showWithdrawModal}
                   num={3}
                   btnText="确认提现"
                   propsArray={withdrawalPropsArray}
                   btnCallback={this.props.handleWithdraw}
                   toggleModal={this.props.toggleWithdraw} />
      </div>
    );
  }
}

export default AccountWelcomePage;
