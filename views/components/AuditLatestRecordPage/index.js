/*
 * 每日生成最新帳單
 */
import React from 'react';
import _ from 'lodash';
import { asyncConnect } from 'redux-connect';
import { Button } from 'antd';
import AccountRecordTable from '../AuditRecordTable';
import FormModal from '../FormModal';
import styles from './styles';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import moment from 'moment';
import {
  logout,
  loadTransactions,
} from '../../redux/modules/auditor';

const tableProps = {
  pagination: false
};

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadTransactions());
    }
  }],
  (state) => ({
    user: state.auditor.user,
    transactions: _.reverse(_.slice(state.auditor.transactions)),
    showTopupModal: state.auditor.showTopupModal,
    showWithdrawModal: state.auditor.showWithdrawModal
  }),
  (dispatch) => ({
    toggleTopup: () => dispatch(toggleTopup()),
    toggleWithdraw: () => dispatch(toggleWithdraw()),
    logout: () => dispatch(logout()),
    handleTopup: (data) => dispatch(topup(data)),
    handleWithdraw: (data) => dispatch(withdraw(data)),
  })
)
class AuditLatestRecordPage extends React.Component {
  render() {
    const { user, transactions } = this.props
    return (
      <div className={styles.container}>
            <AccountRecordTable
              data={transactions.slice(0, 10)}
              tableProps={tableProps}/>
      </div>
    );
  }
}

export default AuditLatestRecordPage;