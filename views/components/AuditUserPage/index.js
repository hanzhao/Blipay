import React from 'react';
import _ from 'lodash';
import { asyncConnect } from 'redux-connect';
import { Form, DatePicker, Button } from 'antd';
import AuditUserTable from '../AuditUserTable';
import FormModal from '../FormModal';
import styles from './styles';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import moment from 'moment';
import {
  logout,
  loadUser
} from '../../redux/modules/auditor';

const RangePicker = DatePicker.RangePicker;

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的交易记录的最大数目 */
    pageSize: Math.max(1, Math.floor((window.innerHeight - 350) / 50))
  }
};

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadUser());
    }
  }],
  (state) => ({
    user: state.auditor.user,
    loguser: _.reverse(_.slice(state.auditor.loguser))
  }),
  (dispatch) => ({
    logout: () => dispatch(logout())
  })
)
class AuditUserPage extends React.Component {
  render() {
    var loguser = this.props.loguser;
    return (
      <div className={styles.container}>
      <div className={styles.balanceValue}>                
                <span className={styles.userCount}>
                  余额异常账户总数：{loguser.length}
                </span>
        </div>
      <div className={styles.wrapper}>
         <AuditUserTable
          className={styles.table}
          data={loguser}
          tableProps={tableProps} />
      </div>
    </div>
    );
  }
}

export default AuditUserPage;
