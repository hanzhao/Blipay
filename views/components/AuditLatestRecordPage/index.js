/*
 * 每日生成最新帳單
 */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, DatePicker, Button } from 'antd';
import AuditRecordTable from '../AuditRecordTable';
import { query } from '../../redux/modules/auditor/query';
import { AuditorgetUserId } from '../../redux/modules/auditor/auth';
import store from '../../redux/store';
import styles from './styles';

function onChange(value) {
    store.dispatch(query(AuditorgetUserId(store.getState()), 
      `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()}`, 
      `${value.getFullYear()}-${value.getMonth()+1}-${value.getDate()+1}`
    ));
};

const disabledDate = function (current) {
  // can not select days after today
  return current && current.getTime() > Date.now();
};

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的交易记录的最大数目 */
    pageSize: Math.max(0, Math.floor((window.innerHeight - 350) / 50))
  }
};
@connect(
  (state) => ({
    queryResult: state.auditor.query.queryResult,
    errorMsg: state.auditor.query.errorMsg
  }), 
  {
    query
  }
)
@reduxForm({
  form: 'user-query',
  fields: ['chosenDate']
  }, undefined, {
  onSubmit: (data) => {
    let d1 = new Date(data.chosenDate);
    store.dispatch(query(AuditorgetUserId(store.getState()), 
      `${d1.getFullYear()}-${d1.getMonth()+1}-${d1.getDate()}`, 
      `${d1.getFullYear()}-${d1.getMonth()+1}-${d1.getDate()+1}`
    ));
  }
})




class AuditLatestRecordPage extends React.Component {
  render() {
    const {  
      fields: {chosenDate}, 
      handleSubmit} = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <div className={styles.container}>
          <DatePicker  class={styles.picker} {...chosenDate} onChange={onChange} disabledDate={disabledDate}/>
          <div className={styles.wrapper}>
            <AuditRecordTable className={styles.table}
                                data={this.props.queryResult ? this.props.queryResult : null}
                                tableProps={tableProps}/>
          </div>
        </div>
      </Form>
    );
  }
}

export default AuditLatestRecordPage;
