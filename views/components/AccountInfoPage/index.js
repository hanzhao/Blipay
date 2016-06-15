/*
 * “个人账户”页面中“基本信息”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux';
import is from 'is_js';

import store from '../../redux/store';
import ajax from '../../common/ajax';
import TogglableInput from '../TogglableInput';
import { updateInfo } from '../../redux/modules/account';
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
    if (is.email(value)) {
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
    if (!/^\d{16,19}[xX]?$/.test(value))
      return callback(new Error('身份证号格式错误。'));
    try {
      await ajax.get('/api/account/check_id', {
        idNumber: value
      });
      callback();
    } catch (err) {
      if (err.type === 'ID_EXIST') {
        callback(new Error('该身份证号已被注册。'));
      } else {
        callback(new Error('验证出现错误。'));
      }
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
    user: state.account.user
  }),
  (dispatch) => ({
    handleSubmit: (data) => dispatch(updateInfo(data))
  })
)

class AccountInfoPage extends React.Component {
  render() {
    const { user, handleSubmit } = this.props;
    const items = [{
      title: '真实姓名',
      display: user.realName,
      callback: handleSubmit,
      field: ['realName', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validateName }]
      }],
      errorMsg: this.props.realNameError,
      requesting: this.props.requestingRealName
    }, {
      title: '身份证号',
      display: user.idNumber,
      callback: handleSubmit,
      field: ['idNumber', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validateId }]
      }],
      errorMsg: this.props.idError,
      requesting: this.props.requestingId
    }, {
      title: '邮箱地址',
      display: user.email,
      callback: handleSubmit,
      field: ['email', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validateEmail }]
      }],
      errorMsg: this.props.emailError,
      requesting: this.props.requestingEmail
    }, {
      title: '手机 / 电话',
      display: user.phone,
      callback: handleSubmit,
      field: ['phone', {
        validateTrigger: 'onChange',
        rules: [{ required: true }, { validator: validatePhone }]
      }],
      errorMsg: this.props.phoneError,
      requesting: this.props.requestingPhone
    }];
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
                                callback={items[i].callback}
                                field={items[i].field} />
              </div>
            </div>
          ))
        }
      </div>);
  }
}

export default AccountInfoPage;
