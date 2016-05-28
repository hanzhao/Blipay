/*
 * 用户验证的细节
*/
import React from 'react';
import { Link } from 'react-router';
import { Input, Button, Row,Col, Table,Popconfirm,message} from 'antd';
import styles from './styles';

function confirm() {
  message.success('点击了确定');
}

function cancel() {
  message.error('点击了取消');
}

const columns1 = [{
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
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
               pagination={false} //需要有{}
        />
        <Table
               className={styles.table}
               columns={columns2}
               dataSource={data2}
               pagination={false}
        />
        <Table
               className={styles.table2}
               columns={columns3}
               dataSource={data3}
               pagination={false}
        />
        <div>
          <Row className={styles.juzhong} /*styles={{text-align:"center"}}*/>
            <Col span={8}>
              <Popconfirm title="确定通过该用户的实名验证吗？" onConfirm={confirm} onCancel={cancel}>
                <Button><a href="#">通过</a></Button>
                </Popconfirm>
            </Col>
            <Col span={8}>
              <Popconfirm title="确定要拒绝该用户的实名验证吗？" onConfirm={confirm} onCancel={cancel}>
                <Button><a href="#">拒绝</a></Button>
                </Popconfirm>
            </Col>
            <Col span={8}><Button><Link to="/admin/account/verification">返回</Link></Button></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AdminVerifyDetail;

//待商榷：点击通过之后可否再点拒绝
//说明：点击一次通过或拒绝之后，该条用户验证从用户验证列表中消失
//待完成：调节页面高度，插入身份证正反面图片
