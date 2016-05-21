/*
 * 每日生成最新帳單
 */
import React from 'react';
import {DatePicker,Table} from 'antd';
import styles from './styles.scss'
function onChange(value) {
  console.log(value);
}
const dataSource = [{
  key: '1',
  time: '0115',
  id: '00001',
  buyer: 'Joseph',
  buy: '-4',
  seller: 'Sam',
  sell: '+4',
  status: 'finished',
}, {
  key: '2',
  time: '0225',
  id: '00002',
  buyer: 'Joseph',
  buy: '-4',
  seller: 'Sam',
  sell: '+4',
  status: 'finished',
},{
	  key: '3',
  time: '0335',
  id: '00003',
  buyer: 'Joseph',
  buy: '-4',
  seller: 'Sam',
  sell: '+4',
  status: 'finished',
},{
	  key: '4',
  time: '0527',
  id: '00004',
  buyer: 'Joseph',
  buy: '-4',
  seller: 'Sam',
  sell: '+4',
  status: 'finished',
},{
	  key: '5',
  time: '0748',
  id: '00005',
  buyer: 'Joseph',
  buy: '-4',
  seller: 'Sam',
  sell: '+4',
  status: 'finished',
}];

const columns = [{
  title: 'time',
  dataIndex: 'time',
  key: 'time',
}, {
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'buyer',
  dataIndex: 'buyer',
  key: 'buyer',
}, {
  title: 'buy',
  dataIndex: 'buy',
  key: 'buy',
}, {
  title: 'seller',
  dataIndex: 'seller',
  key: 'seller',
},{
  title: 'sell',
  dataIndex: 'sell',
  key: 'sell',
},{
  title: 'status',
  dataIndex: 'status',
  key: 'status',
}];

class AuditLatestRecordPage extends React.Component {
  render() {
    return (

    	<div className={styles.datePicker}>
    <DatePicker onChange={onChange} styles={{padding:30}}/>
<Table dataSource={dataSource} columns={columns} />
    	</div>
    );
  }
}

export default AuditLatestRecordPage;
