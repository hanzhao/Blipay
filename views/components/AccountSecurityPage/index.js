/*
 * “个人账户”页面中“安全设置”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux'
import FormModal from '../FormModal';
import SecurityRow from '../SecurityRow';
import styles from './styles';
import ajax from '../../common/ajax';
import { 
  enterChangePaypass, 
  exitChangePaypass, 
  changePaypass
} from '../../redux/modules/account/paypass';
import { 
  enterChangeLoginpass,
  exitChangeLoginpass,
  changeLoginpass
} from '../../redux/modules/account/loginpass';
import { getUserId } from '../../redux/modules/account/auth';
import store from '../../redux/store';

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

const validateLoginpass = async (rule, value, callback) => {
  try {
    const res = await ajax.get(
      '/account/check_loginpass', 
      { 
        userId: getUserId(store.getState()),
        loginPass: value,
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

const loginpassPropsArray = [
  {
    input: {
      placeholder: '请输入支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'paypass', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: validatePaypass }]
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
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: validateLoginpass }]
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

@connect(
  (state) => ({
    changingPaypass: state.account.paypass.changingPaypass,
    changingLoginpass: state.account.loginpass.changingLoginpass,
  }),
  {
    enterChangePaypass,
    exitChangePaypass,
    changePaypass,
    enterChangeLoginpass,
    exitChangeLoginpass,
    changeLoginpass
  }
)
class AccountSecurityPage extends React.Component {
  state = {
    verifyingEmail: false
  };

  toggleVerifyEmail = () => {
    this.setState({
      verifyingEmail: !this.state.verifyingEmail
    });
  };

  handleLoginpass = (values) => {
    this.props.changeLoginpass(
      getUserId(store.getState()),
      values.loginpass
    );
    console.log(values);
  };

  handlePaypass = (values) => {
    this.props.changePaypass(
      getUserId(store.getState()), 
      values.paypass
    );
    console.log(values);
  };

  handleEmail = (values) => {
    // TODO
    console.log(values);
  };
  render() {
    const contents = [
      {
        title: '账户密码',
        brief: '账户密码用于登录您的账户',
        btnText: '修改',
        onClick: this.props.enterChangeLoginpass
      }, {
        title: '支付密码',
        brief: '支付密码用于保障交易安全',
        btnText: '修改',
        onClick: this.props.enterChangePaypass
      }, {
        title: '实名验证',
        brief: '您尚未进行实名验证',
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
                   visible={this.props.changingLoginpass}
                   num={3}
                   btnText="确认修改"
                   propsArray={loginpassPropsArray}
                   btnCallback={this.handleLoginpass}
                   toggleModal={this.props.exitChangeLoginpass} />
        <FormModal title="修改支付密码"
                   visible={this.props.changingPaypass}
                   num={3}
                   btnText="确认修改"
                   propsArray={paypassPropsArray}
                   btnCallback={this.handlePaypass}
                   toggleModal={this.props.exitChangePaypass} />
        <FormModal title="实名验证"
                   visible={this.state.verifyingEmail}
                   num={2}
                   btnText="确认验证"
                   propsArray={emailPropsArray}
                   btnCallback={this.handleEmail}
                   toggleModal={this.toggleVerifyEmail} />
      </div>
    );
  }
}

export default AccountSecurityPage;
