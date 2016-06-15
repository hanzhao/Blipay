/*
 * “个人账户”页面中“安全设置”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux';
import FormModal from '../FormModal';
import UploadModal from '../UploadModal';
import SecurityRow from '../SecurityRow';
import styles from './styles';
import ajax from '../../common/ajax';
import {
  toggleModifyLoginpass,
  toggleModifyPaypass,
  toggleVerification,
  applyVerification,
  changeLoginpass,
  changePaypass
} from '../../redux/modules/account';

/** 密码格式限制 */
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

let loginPass;
let payPass;
let newLoginpass;
let newPaypass;

/** 检验新支付密码是否符合需求 */
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

/** 两次输入检查 */
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

/** 新登录密码检验 */
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

/** 登陆检查 */
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
    await ajax.post('/api/account/check_paypass', {
      payPass: value
    });
    callback();
  } catch (err) {
    callback(new Error('支付密码错误。'));
  }
};

const validateLoginpass = async (rule, value, callback) => {
  try {
    await ajax.post('/api/account/check_loginpass', {
      loginPass: value
    });
    callback();
  } catch (err) {
    callback(new Error('登录密码错误。'));
  }
};

/** 实名验证状态 */
const brief = {
  0: '您尚未进行实名验证。',
  1: '实名验证正在审核中。',
  2: '您已通过实名验证。'
};

const error = {

};

/** 修改登陆密码表单 */
const loginpassPropsArray = [
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
  }, {
    input: {
      placeholder: '请输入新登录密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'loginPass', {
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

/** 修改支付密码表单 */
const paypassPropsArray = [
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
      placeholder: '请输入新支付密码',
      type: 'password',
      autoComplete: 'off'
    },
    field: [
      'payPass', {
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

/** 主页面 */
@connect(
  (state) => ({
    showModifyLoginpassModal: state.account.showModifyLoginpassModal,
    showModifyPaypassModal: state.account.showModifyPaypassModal,
    showVerification: state.account.showVerification,
    user: state.account.user,
    message: state.account.message
  }),
  {
    toggleModifyLoginpass,
    toggleModifyPaypass,
    toggleVerification,
    applyVerification,
    changeLoginpass,
    changePaypass
  }
)
class AccountSecurityPage extends React.Component {

  render() {
    const { user } = this.props;
    const contents = [
      {
        title: '账户密码',
        brief: '账户密码用于登录您的账户',
        btnText: '修改',
        onClick: this.props.toggleModifyLoginpass
      }, {
        title: '支付密码',
        brief: '支付密码用于保障交易安全',
        btnText: '修改',
        onClick: this.props.toggleModifyPaypass
      }, {
        title: '实名验证',
        brief: brief[user.status],
        btnText: user.status === 1 ? '修改' : '验证',
        onClick: this.props.toggleVerification
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
                   visible={this.props.showModifyLoginpassModal}
                   num={3}
                   btnText="确认修改"
                   propsArray={loginpassPropsArray}
                   btnCallback={this.props.changeLoginpass}
                   errorMsg={this.props.message}
                   toggleModal={this.props.toggleModifyLoginpass} />
        <FormModal title="修改支付密码"
                   visible={this.props.showModifyPaypassModal}
                   num={3}
                   btnText="确认修改"
                   propsArray={paypassPropsArray}
                   btnCallback={this.props.changePaypass}
                   errorMsg={this.props.message}
                   toggleModal={this.props.toggleModifyPaypass} />
        <UploadModal title="实名验证"
                     visible={this.props.showVerification}
                     errorMsg={this.props.message && '出现未知错误。'}
                     btnText={user.status === 1 ? '确认修改' : '确认验证'}
                     btnCallback={this.props.applyVerification}
                     toggleModal={this.props.toggleVerification} />
      </div>
    );
  }
}

export default AccountSecurityPage;
