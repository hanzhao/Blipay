/*
 * “个人账户”页面中“安全设置”选项对应的右侧方框。
 */
import React from 'react';
import { Button } from 'antd';
import FormModal from '../FormModal';
import SecurityRow from '../SecurityRow';
import styles from './styles';

const loginpassPropsArray = [
  {
    input: {placeholder: "请输入支付密码", type: "password", autoComplete: "off"},
    field: [ 'paypass', {rules: [ {required: true} ]} ]
  },
  {
    input: {placeholder: "请输入新登录密码", type: "password", autoComplete: "off"},
    field: [ 'loginpass', {rules: [ {required: true} ]} ]
  },
  {
    input: {placeholder: "请再次输入新登录密码", type: "password", autoComplete: "off"},
    field: [ 'reloginpass', {rules: [ {required: true} ]} ]
  }
];

const paypassPropsArray = [
  {
    input: {placeholder: "请输入登录密码", type: "password", autoComplete: "off"},
    field: [ 'loginpass', {rules: [ {required: true} ]} ]
  },
  {
    input: {placeholder: "请输入新支付密码", type: "password", autoComplete: "off"},
    field: [ 'paypass', {rules: [ {required: true} ]} ]
  },
  {
    input: {placeholder: "请再次输入新支付密码", type: "password", autoComplete: "off"},
    field: [ 'repaypass', {rules: [ {required: true} ]} ]
  }
];

const emailPropsArray = [
  {
    input: {placeholder: "请输入邮箱地址", type: "email", autoComplete: "off"},
    field: [ 'email', {rules: [ {required: true} ]} ]
  },
  {
    input: {placeholder: "请输入验证码", type: "text", autoComplete: "off", 
            /*
            addonAfter: (<Button type="ghost" size="small" style={{"margin-right": 25, padding: 2, "font-size":10}}>发送验证码</Button>)
            */
           },
    field: [ 'verification', {rules: [ {required: true} ]} ]
  }
];


class AccountSecurityPage extends React.Component {
  state = {
    changingLoginpass: false,
    changingPaypass: false,
    verifyingEmail: false
  };

  changeLoginpass = () => {
    console.log('in changeLoginpass');
    this.setState({ changingLoginpass: true });
  };

  changePaypass = () => {
    this.setState({ changingPaypass: true });
  };

  verifyEmail = () => {
    this.setState({ verifyingEmail: true });
  };

  handleLoginpass = () => {
    this.setState({ changingLoginpass: false });
  };

  handlePaypass = () => {
    this.setState({ changingPaypass: false });
  };

  handleEmail = () => {
    this.setState({ verifyingEmail: false });
  };

  render() {
    const contents = [
      {title: '账户密码', brief: '账户密码用于登录您的账户', btnText: '修改', onClick: this.changeLoginpass},
      {title: '支付密码', brief: '支付密码用于保障交易安全', btnText: '修改', onClick: this.changePaypass},
      {title: '邮箱验证', brief: '您尚未进行邮箱验证', btnText: '验证', onClick: this.verifyEmail}
    ];
    return (
      <div className={styles.container}>
        {
          Array(2*contents.length+1).fill(0).map((e, i) => {
            if (i % 2 === 0) {
              return (
                <div key={i} className={styles.horizontalBar}/>
              );
            } else {
              return (
                <SecurityRow key={i} content={contents[(i-1)/2]}/>
              );
            }
          })
        }
        <FormModal title={"修改登录密码"} visible={this.state.changingLoginpass} num={3} btnText={"确认修改"} 
                   propsArray={loginpassPropsArray} btnProps={{onClick: this.handleLoginpass}}/>
        <FormModal title={"修改支付密码"} visible={this.state.changingPaypass} num={3} btnText={"确认修改"} 
                   propsArray={paypassPropsArray} btnProps={{onClick: this.handlePaypass}}/>
        <FormModal title={"验证邮箱"} visible={this.state.verifyingEmail} num={2} btnText={"确认验证"} 
                   propsArray={emailPropsArray} btnProps={{onClick: this.handleEmail}}/>
      </div>);
  }
}

export default AccountSecurityPage;
