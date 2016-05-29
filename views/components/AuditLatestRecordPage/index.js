/*
 * 每日生成最新帳單
 */
import React from 'react';
import _ from 'lodash';
import { asyncConnect } from 'redux-connect';
import { Form, DatePicker, Button } from 'antd';
import AuditRecordTable from '../AuditRecordTable';
import FormModal from '../FormModal';
import styles from './styles';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import moment from 'moment';
import {
  logout,
  loadTransactions,
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
      return dispatch(loadTransactions());
    }
  }],
  (state) => ({
    user: state.auditor.user,
    transactions: _.reverse(_.slice(state.auditor.transactions))
  }),
  (dispatch) => ({
    logout: () => dispatch(logout())
  })
)
class AuditLatestRecordPage extends React.Component {
  state = {
    range: [new Date(0), new Date()]
  }
  handleChange = (value) => {
    this.setState({
      range: [value[0], value[1]]
    })
  }
  render() {
    const transactions = this.props.transactions.filter((e) =>
      e.createdAt >= this.state.range[0] && e.createdAt <= this.state.range[1]
    )
    return (
      <div className={styles.container}>
      <RangePicker className={styles.picker}
                     showTime
                     onChange={this.handleChange} />
      <div className={styles.wrapper}>
         <AuditRecordTable
          className={styles.table}
          data={transactions}
          tableProps={tableProps} />
      </div>
    </div>
    );
  }
}

export default AuditLatestRecordPage;
