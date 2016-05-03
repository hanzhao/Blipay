/*
 * “个人账户”页面中“欢迎页面”选项对应的右侧方框。
 */
import React from 'react';
import { Button } from 'antd';

import AccountRecordTable from '../AccountRecordTable';

import styles from './styles';

import { Button, Modal, Form, Input } from 'antd';
import FormModal from '../FormModal';
import styles from './styles';

const FormItem = Form.Item;

const withdrawalPropsArray = [
  {
    input: {placeholder: "请输入银行卡号", type: "text", autoComplete: "off"},
    field: [ 'card', {rules: [ {required: true} ]} ]
  },
  {
    input: {placeholder: "请输入提现金额", type: "text", autoComplete: "off"},
    field: [ 'amount', {rules: [ {required: true} ]} ],
  },
  {
    input: {placeholder: "请输入支付密码", type: "password", autoComplete: "off"},
    field: [ 'password', {rules: [ {required: true} ]} ]
  }
];

const topupPropsArray = [
  {
    input: {placeholder: "请输入银行卡号", type: "text", autoComplete: "off"},
    field: [ 'card', {rules: [ {required: true} ]} ]
  },
  {
    input: {placeholder: "请输入充值金额", type: "text", autoComplete: "off"},
    field: [ 'amount', {rules: [ {required: true} ]} ],
  },
  {
    input: {placeholder: "请输入支付密码", type: "password", autoComplete: "off"},
    field: [ 'password', {rules: [ {required: true} ]} ]
  }
];

class AccountWelcomePage extends React.Component {
  state = {
    showTopup: false,
    showWithdrawal: false
  };
  enterTopup = () => {
    this.setState({
      showTopup: true
    });
  };
  enterWithDrawal = () => {
    this.setState({
      showWithdrawal: true
    });
  };
  submitTopup = (e) => {
    this.setState({
      showTopup: false
    });
  };
  submitWithDrawal = (e) => {
    this.setState({
      showWithdrawal: false
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
                <Button className={styles.topup} onClick={this.enterTopup}>充值</Button>
                <Button className={styles.withdrawal} onClick={this.enterWithDrawal}>提现</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.horizontalBar}/>
        <div className={styles.lowerHalf}>
          <div className={styles.title}>最近交易</div>
          <AccountRecordTable />
        </div>
        <FormModal title={"账户充值"} visible={this.state.showTopup} num={3} btnText={"确认充值"} 
                   propsArray={topupPropsArray} btnProps={{onClick: this.submitTopup}}/>
        <FormModal title={"账户提现"} visible={this.state.showWithdrawal} num={3} btnText={"确认提现"} 
                   propsArray={withdrawalPropsArray} btnProps={{onClick: this.submitWithDrawal}}/>
      </div>
    );
  }
}

export default AccountWelcomePage;
