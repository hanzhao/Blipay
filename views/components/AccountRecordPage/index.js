/*
 * “个人账户”页面中“交易记录”选项对应的右侧方框。
 */
import React from 'react';

import { DatePicker, Button, Pagination } from 'antd';
import RecordRow from '../RecordRow';

import styles from './styles';

const RangePicker = DatePicker.RangePicker;

const records = [
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'},
  {date: '2015.01.01', name: '账户充值', amount: 100.0, status: '交易成功'} 
];

class AccountRecordPage extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        {/* 日期选择 */}
        <RangePicker class={styles.picker}/>
        {/* 搜索按钮 */}
        <Button type="ghost" className={styles.button}>搜索</Button>
        <div className={styles.wrapper}>
          <table className={styles.records}>
            <tbody>
            { records.map((item, index) => (
              <RecordRow record={item} background={index%2===0 ? '#FFFFFF' : '#EEEEEE'}/>
            )) }
            </tbody>
          </table>
        </div>
        {/* 页数选择 */}
        <Pagination simple defaultCurrent={1} total={5} className={styles.pagination}/>
      </div>);
  }
}

export default AccountRecordPage;
