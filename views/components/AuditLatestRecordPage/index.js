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
  insertData,
  toggleWithdraw,
  withdraw
} from '../../redux/modules/auditor';

const RangePicker = DatePicker.RangePicker;

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的交易记录的最大数目 */
    pageSize: Math.max(1, Math.floor((window.innerHeight - 350) / 50))
  }
};

const validateId = async (rule, value, callback) => {
  try {
    await ajax.post('/api/auditor/check_recordid', {
      //payPass: value
      id:value
    });
    callback();
  } catch (err) {
    callback(new Error('不存在该订单记录。'));
  }
};

const validateInfo = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (value.length < 30) {
      callback();
    } else {
      callback(new Error('备注过长。'));
    }
  }
};

const withdrawalPropsArray = [
  {
    input: {
      placeholder: '请输入订单流水号',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'id', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: validateId }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入备注 ',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'info', {
        rules: [{ required: true }, { validator: validateInfo }]
      }
    ]
  }
];

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadTransactions());
    }
  }],
  (state) => ({
    user: state.auditor.user,
    transactions: _.reverse(_.slice(state.auditor.transactions)),
    showWithdrawModal: state.auditor.showWithdrawModal
  }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
    toggleWithdraw: () => dispatch(toggleWithdraw()),
    handleWithdraw: (data) => dispatch(withdraw(data))
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
        <div>
                 <Button className={styles.withdrawal}
                        onClick={this.props.toggleWithdraw}>
                  备注
                </Button>

        </div>
      <div className={styles.wrapper}>
         <AuditRecordTable
          className={styles.table}
          data={transactions}
          tableProps={tableProps} />
      </div>
      <FormModal title="添加备注"
                   visible={this.props.showWithdrawModal}
                   num={2}
                   btnText="确认"
                   propsArray={withdrawalPropsArray}
                   btnCallback={this.props.handleWithdraw}
                   toggleModal={this.props.toggleWithdraw} />
    </div>
    
    );
  }
}

export default AuditLatestRecordPage;