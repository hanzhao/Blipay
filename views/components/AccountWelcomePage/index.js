/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import AccountRecordTable from '../AccountRecordTable';
import FormModal from '../FormModal';
import styles from './styles';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import { 
  getUserId, 
  updateBalance,
  updateTransaction
} from '../../redux/modules/account/auth';
import {
  enterTopup, 
  exitTopup, 
  topup,
  getTopupBalance
} from '../../redux/modules/account/topup';
import {
  enterWithdraw,
  exitWithdraw,
  withdraw,
  getWithdrawBalance
} from '../../redux/modules/account/withdraw';

const validateAmount = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    try {
      JSON.parse(value);
    } catch(err) {
      callback(new Error());
    }
    if (!isNaN(value) && JSON.parse(value) > 0) {
      callback();
    } else {
      callback(new Error());
    }
  }
};

const validatePaypass = async (rule, value, callback) => {
  try {
    const res = await ajax.get(
      '/account/check_paypass', 
      { 
        userId: getUserId(store.getState()),
        payPass: value,
      }
    );
    if (res.code === 0) {
      callback();
    } else {
      callback(new Error());
    }
  } catch(err) {
    callback(new Error());
  }
};

const validateCard = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (/^\d{16,19}/.test(value)) {
      callback();
    } else {
      callback(new Error());
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
        rules: [{ required: true }, { validator: validateAmount }]
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
        rules: [{ required: true }, { validator: validateAmount }]
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
    return "0";
  else
    return (balance.toFixed(2) + '').split('.')[0];
}

const getBalanceTail = (balance) => {
  if (isNaN(balance))
    return "00";
  else
    return (balance.toFixed(2) + '').split('.')[1]
}

@connect(
  (state) => ({
    userName: state.account.auth.userName,
    balance: state.account.auth.balance,
    lastLogin: state.account.auth.lastLogin,
    toppingUp: state.account.topup.toppingUp,
    withdrawing: state.account.withdraw.withdrawing,
    topupError: state.account.topup.errorMsg,
    withdrawError: state.account.withdraw.errorMsg,
    transactions: state.account.auth.transactions
  }),
  {
    enterTopup,
    exitTopup,
    topup,
    enterWithdraw,
    exitWithdraw,
    withdraw,
    updateBalance,
    updateTransaction
  }
)
class AccountWelcomePage extends React.Component {
  topupUpdate = () => {
    if (!this.props.toppingUp && !this.props.topupError){
      this.props.updateBalance(
        getTopupBalance(store.getState())
      );
      this.props.updateTransaction(
        getUserId(store.getState())
      );
    } else {
      setTimeout(this.topupUpdate, 200);
    }
  };

  withdrawUpdate = () => {
    if (!this.props.withdrawing && !this.props.withdrawError) {
      this.props.updateBalance(
        getWithdrawBalance(store.getState())
      );
      this.props.updateTransaction(
        getUserId(store.getState())
      );
    } else {
      setTimeout(this.withdrawUpdate, 200);
    }
  }

  handleTopup = (values) => {
    this.props.topup(
      getUserId(store.getState()),
      Number(values.amount)
    );
    this.topupUpdate();
  };

  handleWithdraw = (values) => {
    this.props.withdraw(
      getUserId(store.getState()),
      Number(values.amount)
    );
    this.withdrawUpdate();
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.upperHalf}>
          <div className={styles.info}>
            <div className={styles.greeting}>下午好，{this.props.userName}！</div>
            <div className={styles.lastLogin}>
              上次登录时间：{this.props.lastLogin}
            </div>
          </div>
          <div className={styles.verticalBar}/>
          <div className={styles.balance}>
            <div className={styles.balanceTitle}>账户余额</div>
            <div className={styles.balanceLower}>
              <div className={styles.balanceValue}>
                <span className={styles.balanceHead}>￥{getBalanceHead(this.props.balance)}.</span>
                <span className={styles.balanceTail}>{getBalanceTail(this.props.balance)}</span>
              </div>
              <div className={styles.balanceOperation}>
                <Button className={styles.topup}
                        onClick={this.props.enterTopup}>
                  充值
                </Button>
                <Button className={styles.withdrawal}
                        onClick={this.props.enterWithdraw}>
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
            <AccountRecordTable data={this.props.transactions.slice(0, 
                                      Math.max(0, Math.floor((window.innerHeight - 450) / 50)))}
                                tableProps={tableProps}/>
          </div>
        </div>
        <FormModal title="账户充值"
                   visible={this.props.toppingUp}
                   num={3}
                   btnText="确认充值"
                   propsArray={topupPropsArray}
                   btnCallback={this.handleTopup}
                   toggleModal={this.props.exitTopup} />
        <FormModal title="账户提现"
                   visible={this.props.withdrawing}
                   num={3}
                   btnText="确认提现"
                   propsArray={withdrawalPropsArray}
                   btnCallback={this.handleWithdraw}
                   toggleModal={this.props.exitWithdraw} />
      </div>
    );
  }
}

export default AccountWelcomePage;
