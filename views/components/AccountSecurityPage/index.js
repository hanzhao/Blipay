/*
 * “个人账户”页面中“安全设置”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux';
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

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

let loginPass;
let payPass;
let newLoginpass;
let newPaypass;

const validateNewPaypass = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (!passwordRegex.test(value)) {
      callback(new Error('密码必须包含字母和数字组合，长度至少 8 位。'));
    } else if (value === loginPass) {
      callback(new Error('支付密码不得与登录密码相同。'));
    } else {
      newPaypass = value;
      callback();
    }
  } 
};

const validateRePaypass = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (value !== newPaypass) {
      callback(new Error('两次输入的密码不匹配。'));
    } else {
      callback();
    }
  } 
};

const validateNewLoginpass = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (!passwordRegex.test(value)) {
      callback(new Error('密码必须包含字母和数字组合，长度至少 8 位。'));
    } else if (value === payPass) {
      callback(new Error('登录密码不得与支付密码相同。'));
    } else {
      newLoginpass = value;
      callback();
    }
  } 
};

const validateReLoginpass = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (value !== newLoginpass) {
      callback(new Error('两次输入的密码不匹配。'));
    } else {
      callback();
    }
  } 
};

const validatePaypass = async (rule, value, callback) => {
  try {
    const res = await ajax.get(
      '/account/check_paypass', 
      { 
        userId: getUserId(store.getState()),
        payPass: value
      }
    );
    if (res.code === 0) {
      payPass = value;
      callback();
    } else {
      callback(new Error('验证支付密码出现错误。'));
    }
  } catch(err) {
    if (err.code === -3)
      callback(new Error('支付密码不正确。'));
    else
      callback(new Error('验证支付密码出现错误。'));
  }
};

const validateLoginpass = async (rule, value, callback) => {
  try {
    const res = await ajax.get(
      '/account/check_loginpass', 
      { 
        userId: getUserId(store.getState()),
        loginPass: value
      }
    );
    if (res.code === 0) {
      loginPass = value;
      callback();
    } else {
      callback(new Error('验证登录密码出现错误。'));
    }
  } catch(err) {
    if (err.code === -3)
      callback(new Error('登录密码不正确。'));
    else
      callback(new Error('验证登录密码出现错误。'));
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
        rules: [{ required: true }, { validator: validateNewLoginpass }]
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
        rules: [{ required: true }, { validator: validateReLoginpass }]
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
        rules: [{ required: true }, { validator: validateNewPaypass }]
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
        rules: [{ required: true }, { validator: validateRePaypass }]
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
    paypassError: state.account.paypass.errorMsg,
    loginpassError: state.account.loginpass.errorMsg,
    requestingPaypass: state.account.paypass.requesting,
    requestingLoginpass: state.account.loginpass.requesting
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
                   loading={this.props.requestingLoginpass}
                   btnCallback={this.handleLoginpass}
                   errorMsg={this.props.loginpassError}
                   toggleModal={this.props.exitChangeLoginpass} />
        <FormModal title="修改支付密码"
                   visible={this.props.changingPaypass}
                   num={3}
                   btnText="确认修改"
                   propsArray={paypassPropsArray}
                   loading={this.props.requestingPaypass}
                   btnCallback={this.handlePaypass}
                   errorMsg={this.props.paypassError}
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
