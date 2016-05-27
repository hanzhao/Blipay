/*
 * “个人账户”页面中“基本信息”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux';
import store from '../../redux/store';
import TogglableInput from '../TogglableInput';
import {
  getUserId,
  updateUserName,
  updateRealName,
  updateIdNumber,
  updateEmail,
  updatePhone
} from '../../redux/modules/account/auth';
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
    if (/^\d{5,11}/.test(value)) {
      callback();
    } else {
      callback(new Error());
    }
  }
};

const validateId = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (/^\d{16,19}\w+/.test(value)) {
      callback();
    } else {
      callback(new Error());
    }
  }
};

const validateNickname = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    // TODO
    callback();
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
    userName: state.account.auth.userName,
    realName: state.account.auth.realName,
    idNumber: state.account.auth.idNumber,
    email: state.account.auth.email,
    phone: state.account.auth.phone,
    changingUserName: state.account.info.changingUserName,
    userNameError: state.account.info.userNameError,
    changingRealName: state.account.info.changingRealName,
    realNameError: state.account.info.realNameError,
    changingEmail: state.account.info.changingEmail,
    emailError: state.account.info.emailError,
    changingPhone: state.account.info.changingPhone,
    phoneError: state.account.info.phoneError,
    changingId: state.account.info.changingId,
    idError: state.account.info.idError
  }),
  {
    changeUserName,
    changeRealName,
    changeEmail,
    changePhone,
    changeIdNumber,
    updatePhone,
    updateEmail,
    updateUserName,
    updateIdNumber,
    updateRealName
  }
)

class AccountInfoPage extends React.Component {
  handleUserName = (values) => {
    this.props.changeUserName(getUserId(store.getState()), values.nickname);
    const waitUserName = () => {
      if (!this.props.changingUserName && !this.props.userNameError) {
        this.props.updateUserName(values.nickname);
      } else if (this.props.changingUserName) {
        setTimeout(waitUserName, 200);
      }
    }
    waitUserName();
  };

  handleRealName = (values) => {
    this.props.changeRealName(getUserId(store.getState()), values.realName);
    const waitRealName = () => {
      if (!this.props.changingRealName && !this.props.realNameError) {
        this.props.updateRealName(values.realName);
      } else {
        setTimeout(waitRealName, 200);
      }
    };
    waitRealName();
  };

  handleIdNumber = (values) => {
    this.props.changeIdNumber(getUserId(store.getState()), values.id);
    const waitIdNumber = () => {
      if (!this.props.changingId && !this.props.idError) {
        this.props.updateIdNumber(values.id);
      } else {
        setTimeout(waitIdNumber, 200);
      }
    };
    waitIdNumber();
  };

  handleEmail = (values) => {
    this.props.changeEmail(getUserId(store.getState()), values.email);
    const waitEmail = () => {
      if (!this.props.changingEmail && !this.props.emailError) {
        this.props.updateEmail(values.email);
      } else {
        setTimeout(waitEmail, 200);
      }
    };
    waitEmail();
  };

  handlePhone = (values) => {
    this.props.changePhone(getUserId(store.getState()), values.phone);
    const waitPhone = () => {
      if (!this.props.changingPhone && !this.props.phoneError) {
        this.props.updatePhone(values.phone);
      } else {
        setTimeout(waitPhone, 200);
      }
    };
    waitPhone();
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
        }] 
      },
      { 
        title: '真实姓名', 
        display: this.props.realName, 
        callback: this.handleRealName, 
        field: ['realName', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validateName }]
        }] 
      },
      { 
        title: '身份证号', 
        display: this.props.idNumber, 
        callback: this.handleIdNumber, 
        field: ['id', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validateId }]
        }] 
      },
      { 
        title: '邮箱地址', 
        display: this.props.email, 
        callback: this.handleEmail, 
        field: ['email', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { type: 'email'}]
        }] 
      },
      { 
        title: '手机/电话', 
        display: this.props.phone, 
        callback: this.handlePhone, 
        field: ['phone', {
          validateTrigger: 'onChange',
          rules: [{ required: true }, { validator: validatePhone }]
        }] 
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
