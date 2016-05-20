/*
 * “个人账户”页面中“基本信息”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store';
import ajax from '../../common/ajax';
import TogglableInput from '../TogglableInput';
import { getUserId } from '../../redux/modules/account/auth';
import {
  changeUserName,
  changeRealName,
  changeEmail,
  changePhone,
  changeIdNumber
} from '../../redux/modules/account/info';
import styles from './styles';

const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (/^\d{5,11}$/.test(value)) {
      callback();
    } else {
      callback(new Error('号码格式不合法。'));
    }
  }
};

const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value)) {
      callback();
    } else {
      callback(new Error('邮箱格式不合法。'));
    }
  }
};

const validateId = async (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (/^\d{16,19}[xX]?$/.test(value)) {
      try {
        await ajax.get(
          '/account/check_id', 
          { 
            idNumber: value
          }
        );
        callback();
      } catch(err) {
        if (err.code === -1) {
          callback(new Error('该身份证号已被注册。'));
        } else {
          callback(new Error('验证出现错误。'));
        }
      }
    } else {
      callback(new Error('身份证号格式错误。'));
    }
  }
};

const validateNickname = async (rule, value, callback) => {
  try {
    await ajax.get(
      '/account/check_username', 
      { 
        userName: value
      }
    );
    callback();
  } catch(err) {
    if (err.code === -1) {
      callback(new Error('该用户名已被注册。'));
    } else {
      callback(new Error('验证出现错误。'));
    }
  }
};

const validateName = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    // TODO
    callback();
  }
};

@connect(
  (state) => ({
    userName: state.account.info.userName,
    realName: state.account.info.realName,
    idNumber: state.account.info.idNumber,
    email: state.account.info.email,
    phone: state.account.info.phone,
    requestingUserName: state.account.info.requestingUserName,
    changingUserName: state.account.info.changingUserName,
    userNameError: state.account.info.userNameError,
    requestingRealName: state.account.info.requestingRealName,
    changingRealName: state.account.info.changingRealName,
    realNameError: state.account.info.realNameError,
    requestingId: state.account.info.requestingId,
    changingEmail: state.account.info.changingEmail,
    emailError: state.account.info.emailError,
    requestingEmail: state.account.info.requestingEmail,
    changingPhone: state.account.info.changingPhone,
    phoneError: state.account.info.phoneError,
    requestingPhone: state.account.info.requestingPhone,
    changingId: state.account.info.changingId,
    idError: state.account.info.idError
  }),
  {
    changeUserName,
    changeRealName,
    changeEmail,
    changePhone,
    changeIdNumber
  }
)

class AccountInfoPage extends React.Component {
  handleUserName = (values) => {
    this.props.changeUserName(getUserId(store.getState()), values.nickname);
  };

  handleRealName = (values) => {
    this.props.changeRealName(getUserId(store.getState()), values.realName);
  };

  handleIdNumber = (values) => {
    this.props.changeIdNumber(getUserId(store.getState()), values.id);
  };

  handleEmail = (values) => {
    this.props.changeEmail(getUserId(store.getState()), values.email);
  };

  handlePhone = (values) => {
    this.props.changePhone(getUserId(store.getState()), values.phone);
  };
  
  render() {
    const items = [
      { 
        title: '昵称', 
        display: this.props.userName, 
        callback: this.handleUserName, 
        field: ['nickname', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validateNickname }]
        }],
        errorMsg: this.props.userNameError,
        requesting: this.props.requestingUserName
      },
      { 
        title: '真实姓名', 
        display: this.props.realName, 
        callback: this.handleRealName, 
        field: ['realName', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validateName }]
        }],
        errorMsg: this.props.realNameError,
        requesting: this.props.requestingRealName
      },
      { 
        title: '身份证号', 
        display: this.props.idNumber, 
        callback: this.handleIdNumber, 
        field: ['id', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validateId }]
        }],
        errorMsg: this.props.idError,
        requesting: this.props.requestingId
      },
      { 
        title: '邮箱地址', 
        display: this.props.email, 
        callback: this.handleEmail, 
        field: ['email', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validateEmail }]
        }],
        errorMsg: this.props.emailError,
        requesting: this.props.requestingEmail
      },
      { 
        title: '手机/电话', 
        display: this.props.phone, 
        callback: this.handlePhone, 
        field: ['phone', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validatePhone }]
        }],
        errorMsg: this.props.phoneError,
        requesting: this.props.requestingPhone
      }
    ];
    return (
      <div className={styles.container}>{/* 外边框 */}
        <div className={styles.mainTitle}>修改个人资料</div>{/* 标题 */}
        {
          items.map((e, i) => (
            <div key={i} className={styles.wrapper}>
              <div className={styles.row}>
                {/* 每一项前的名称 */}
                <div className={styles.editTitle}>
                  { items[i].title }
                </div>
                <TogglableInput defaultValue={items[i].display} 
                                errorMsg={items[i].errorMsg}
                                loading={items[i].requesting}
                                callback={items[i].callback}
                                field={items[i].field}/>
              </div>
            </div>
          ))
        }
      </div>);
  }
}

export default AccountInfoPage;
