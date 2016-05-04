/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react';
import { Button } from 'antd';
import AccountRecordTable from '../AccountRecordTable';
import FormModal from '../FormModal';
import styles from './styles';

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
        rules: [{ required: true }]
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
        rules: [{ required: true }]
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
        rules: [{ required: true }]
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
        rules: [{ required: true }]
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
        rules: [{ required: true }]
      }
    ]
  }
];

/* 以下是本页所能显示交易记录的最大数目 */
const fakeData = Array(Math.floor((window.innerHeight - 400) / 50)).fill({
  date: '2015.01.01 19:08:32',
  description: '账户充值',
  amount: 100.00,
  status: '交易成功'
});

const tableProps = {
  pagination: false
};

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
    return (
      <div className={styles.container}>
        <div className={styles.upperHalf}>
          <div className={styles.info}>
            <div className={styles.greeting}>下午好，老王！</div>
            <div className={styles.lastLogin}>
              上次登录时间：2015.01.01 12:00
            </div>
          </div>
          <div className={styles.verticalBar}/>
          <div className={styles.balance}>
            <div className={styles.balanceTitle}>账户余额</div>
            <div className={styles.balanceLower}>
              <div className={styles.balanceValue}>
                <span className={styles.balanceHead}>￥0.</span>
                <span className={styles.balanceTail}>00</span>
              </div>
              <div className={styles.balanceOperation}>
                <Button className={styles.topup}
                        onClick={this.toggleTopup}>
                  充值
                </Button>
                <Button className={styles.withdrawal}
                        onClick={this.toggleWithDrawal}>
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
            <AccountRecordTable data={fakeData} tableProps={tableProps}/>
          </div>
        </div>
        <FormModal title="账户充值"
                   visible={this.state.showTopup}
                   num={3}
                   btnText="确认充值"
                   propsArray={topupPropsArray}
                   btnProps={{ onClick: this.submitTopup }}
                   toggleModal={ this.toggleTopup } />
        <FormModal title="账户提现"
                   visible={this.state.showWithdrawal}
                   num={3}
                   btnText="确认提现"
                   propsArray={withdrawalPropsArray}
                   btnProps={{ onClick: this.submitWithDrawal }}
                   toggleModal={ this.toggleWithDrawal } />
      </div>
    );
  }
}

export default AccountWelcomePage;
