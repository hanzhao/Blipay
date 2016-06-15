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
  loadLog
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
      return dispatch(loadLog());
    }
  }],
  (state) => ({
    user: state.auditor.user,
    logtable: _.reverse(_.slice(state.auditor.logtable))
  }),
  (dispatch) => ({
    logout: () => dispatch(logout())
  })
)
class AuditLogPage extends React.Component {
  state = {
    range: [new Date(0), new Date()]
  }
  handleChange = (value) => {
    this.setState({
      range: [value[0], value[1]]
    });
  }
  render() {
    const logtable = this.props.logtable.filter((e) =>
      e.createdAt >= this.state.range[0] && e.createdAt <= this.state.range[1]
    );
    return (
      <div className={styles.container}>
      <RangePicker className={styles.picker}
                     showTime
                     onChange={this.handleChange} />
      <div className={styles.wrapper}>
         <AuditRecordTable
          className={styles.table}
          data={logtable}
          tableProps={tableProps} />
      </div>
    </div>
    );
  }
}

export default AuditLogPage;
