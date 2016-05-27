/*
 * “个人账户”页面中“交易记录”选项对应的右侧方框。
 */
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Form, DatePicker, Button } from 'antd';
import AccountRecordTable from '../AccountRecordTable';
import { query } from '../../redux/modules/account/query';
import { getUserId } from '../../redux/modules/account/auth';
import store from '../../redux/store';
import styles from './styles';

const RangePicker = DatePicker.RangePicker;

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的交易记录的最大数目 */
    pageSize: Math.max(0, Math.floor((window.innerHeight - 350) / 50))
  }
};

@connect(
  (state) => ({
    queryResult: state.account.query.queryResult,
    errorMsg: state.account.query.errorMsg
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
    let d1 = new Date(data.chosenDate[0]);
    let d2 = new Date(data.chosenDate[1]);
    store.dispatch(query(getUserId(store.getState()), 
      `${d1.getFullYear()}-${d1.getMonth()+1}-${d1.getDate()}`, 
      `${d2.getFullYear()}-${d2.getMonth()+1}-${d2.getDate()}`
    ));
  }
})
class AccountRecordPage extends React.Component {
  render() {
    const {  
      fields: {chosenDate}, 
      handleSubmit} = this.props;
    return (
      <Form horizontal onSubmit={handleSubmit}>
        <div className={styles.container}>
          <RangePicker class={styles.picker} {...chosenDate}/>
          <Button type="ghost" className={styles.button} htmlType="submit">搜索</Button>
          <div className={styles.wrapper}>
            <AccountRecordTable className={styles.table}
                                data={this.props.queryResult ? this.props.queryResult : null}
                                tableProps={tableProps}/>
          </div>
        </div>
      </Form>
    );
  }
}

export default AccountRecordPage;
