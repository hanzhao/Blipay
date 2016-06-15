/*
 * “个人账户”页面中“交易记录”选项对应的右侧方框。
 */
import React from 'react';
import _ from 'lodash';
import { asyncConnect } from 'redux-connect';
import { reduxForm } from 'redux-form';
import { Form, DatePicker, Button } from 'antd';
import AccountRecordTable from '../AccountRecordTable';
import store from '../../redux/store';
import styles from './styles';
import {
  loadTransactions
} from '../../redux/modules/account';

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
    // 通过 slice 生成新对象，不要改变原对象
    transactions: _.reverse(_.slice(state.account.transactions))
  })
)
class AccountRecordPage extends React.Component {
  state = {
    range: [new Date(0), new Date()]
  }
  handleChange = (value) => {
    this.setState({
      range: [value[0], value[1]]
    });
  }
  render() {
    const transactions = this.props.transactions.filter((e) =>
      e.createdAt >= this.state.range[0] && e.createdAt <= this.state.range[1]
    );
    return (
      <div className={styles.container}>
        <RangePicker className={styles.picker}
                     showTime
                     onChange={this.handleChange} />
        <div className={styles.wrapper}>
          <AccountRecordTable
            className={styles.table}
            data={transactions}
            tableProps={tableProps} />
        </div>
      </div>
    );
  }
}

export default AccountRecordPage;
