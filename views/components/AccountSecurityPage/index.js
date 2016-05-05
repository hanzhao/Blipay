/*
 * “个人账户”页面中“安全设置”选项对应的右侧方框。
 */
import React from 'react';
/*
import { Button } from 'antd';
*/
import FormModal from '../FormModal';
import SecurityRow from '../SecurityRow';
import styles from './styles';

const loginpassPropsArray = [
  {
    input: {
      placeholder: '请输入支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'paypass', {
        rules: [{ required: true }]
      }
    ]
  }, {
    input: {
      placeholder: '请输入新登录密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'loginpass', {
        rules: [{ required: true }]
      }
    ]
  }, {
    input: {
      placeholder: '请再次输入新登录密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'reloginpass', {
        rules: [{ required: true }]
      }
    ]
  }
];

const paypassPropsArray = [
  {
    input: {
      placeholder: '请输入登录密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'loginpass', {
        rules: [{ required: true }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入新支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'paypass', {
        rules: [{ required: true }]
      }
    ]
  },
  {
    input: {
      placeholder: '请再次输入新支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'repaypass', {
        rules: [{ required: true }]
      }
    ]
  }
];

const emailPropsArray = [
  {
    input: {
      placeholder: '请输入邮箱地址',
      type: 'email',
      autoComplete: 'off'
    },
    field: [
      'email', {
        rules: [{ required: true }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入验证码',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'verification', {
        rules: [{ required: true }]
      }
    ]
  }
];


class AccountSecurityPage extends React.Component {
  state = {
    changingLoginpass: false,
    changingPaypass: false,
    verifyingEmail: false
  };

  toggleLoginpass = () => {
    this.setState({
      changingLoginpass: !this.state.changingLoginpass
    });
  };

  togglePaypass = () => {
    this.setState({
      changingPaypass: !this.state.changingPaypass
    });
  };

  toggleVerifyEmail = () => {
    this.setState({
      verifyingEmail: !this.state.verifyingEmail
    });
  };

  render() {
    const contents = [
      {
        title: '账户密码',
        brief: '账户密码用于登录您的账户',
        btnText: '修改',
        onClick: this.toggleLoginpass
      }, {
        title: '支付密码',
        brief: '支付密码用于保障交易安全',
        btnText: '修改',
        onClick: this.togglePaypass
      }, {
        title: '邮箱验证',
        brief: '您尚未进行邮箱验证',
        btnText: '验证',
        onClick: this.toggleVerifyEmail
      }
    ];
    return (
      <div className={styles.container}>
        {
          contents.map((e, i) => (
            <SecurityRow className={styles.row} key={i} content={e} />
          ))
        }
        <FormModal title="修改登录密码"
                   visible={this.state.changingLoginpass}
                   num={3}
                   btnText="确认修改"
                   propsArray={loginpassPropsArray}
                   btnProps={{ onClick: this.handleLoginpass }}
                   toggleModal={this.toggleLoginpass} />
        <FormModal title="修改支付密码"
                   visible={this.state.changingPaypass}
                   num={3}
                   btnText="确认修改"
                   propsArray={paypassPropsArray}
                   btnProps={{ onClick: this.handlePaypass }}
                   toggleModal={this.togglePaypass} />
        <FormModal title="验证邮箱"
                   visible={this.state.verifyingEmail}
                   num={2}
                   btnText="确认验证"
                   propsArray={emailPropsArray}
                   btnProps={{ onClick: this.handleEmail }}
                   toggleModal={this.toggleVerifyEmail} />
      </div>
    );
  }
}

export default AccountSecurityPage;
