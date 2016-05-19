/*
 * 用户验证的细节
*/
import React from 'react';
import { Link } from 'react-router';
import { Input, Button, Row,Col, Table} from 'antd';
import styles from './styles';

import { Popconfirm, message } from 'antd';

function confirm() {
  message.success('点击了确定');
}

function cancel() {
  message.error('点击了取消');
}

ReactDOM.render(
  <Popconfirm title="确定要删除这个任务吗？" onConfirm={confirm} onCancel={cancel}>
    <a href="#">删除</a>
  </Popconfirm>
, mountNode);


const columns1 = [{
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
  //sorter: (a, b) => a < b ? -1: 1,
}, {
  title: '用户ID',
  dataIndex: 'id',
  key: 'id',
},{
  title: '用户真实姓名',
  dataIndex: 'realname',
  key: 'realname'
/* ,  render(text, record) {
    return (
      <Button onClick={() => alert(record.id)}>{ text }</Button>
    )
  }
*/
}
];

const columns2 = [{
  title:'身份证正面',
  dataIndex:'identification_front',
  key:'identification_front'
  /*,  render(text, record) {
      return (
        <Button onClick={() => alert(record.id)}>{ text }</Button>
      )*/
},{
  title:'身份证反面',
  dataIndex:'identification_back',
  key:'identification_back'
/*
  ,  render(text, record) {
      return (
        <Button onClick={() => alert(record.id)}>{ text }</Button>
      )
      */
}
];

const columns3 = [{
  title:'其他验证信息',
  dataIndex:'information',
  key:'information'
}
];

const data1 = [{
  key: '1',
  name: 'Shirley',
  id: '3130100668',
  realname: '陈雪儿'
}];

const data2 = [{
  key: '1',
  identification_front:'身份证正面',
  identification_back:'身份证反面'
}];

const data3 = [{
  key: '1',
  information:'浙江大学2013级学生'
}];

class AdminVerifyDetail extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Table
               className={styles.table}
               columns={columns1}
               dataSource={data1}
               //{...tableProps}
               pagination={false} //需要有{}
        />
        <Table
               className={styles.table}
               columns={columns2}
               dataSource={data2}
               //{...tableProps}
               pagination={false}
        />
        <Table
               className={styles.table2}
               columns={columns3}
               dataSource={data3}
               //{...tableProps}
               pagination={false}
        />
        <div>
          <Row className={styles.juzhong} /*styles={{text-align="center"}}*/>
            <Col span={8}><Button onClick={() => alert("已通过该用户的实名验证")}>通过</Button></Col>
            <Col span={8}><Button onClick={() => alert("已拒绝该用户的实名验证")}>拒绝</Button></Col>
            <Col span={8}><Button>返回</Button></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AdminVerifyDetail;
