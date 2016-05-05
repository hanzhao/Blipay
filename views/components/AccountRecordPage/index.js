/*
 * “个人账户”页面中“交易记录”选项对应的右侧方框。
 */
import React from 'react';

import { DatePicker, Button } from 'antd';
import AccountRecordTable from '../AccountRecordTable';

import styles from './styles';

const RangePicker = DatePicker.RangePicker;

const fakeData = Array(50).fill({
  date: '2015.01.01 19:08:32',
  description: '账户充值',
  amount: 100.00,
  status: '交易成功'
});

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的交易记录的最大数目 */
    pageSize: Math.floor((window.innerHeight - 350) / 50)
  }
};

class AccountRecordPage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        {/* 日期选择 */}
        <RangePicker class={styles.picker}/>
        {/* 搜索按钮 */}
        <Button type="ghost" className={styles.button}>搜索</Button>
        <div className={styles.wrapper}>
          <AccountRecordTable className={styles.table}
                              data={fakeData}
                              tableProps={tableProps}/>
        </div>
      </div>);
  }
}

export default AccountRecordPage;
