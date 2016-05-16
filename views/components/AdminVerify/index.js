/*
 * Admin for users' verification
*/
import React from 'react';
import { Input, Button, Col, Table} from 'antd';
import styles from './styles';

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的用户验证请求的最大数目 */
    pageSize: Math.floor((window.innerHeight - 350) / 50)
  }
};

const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index,
    amount: `${d.amount > 0 ? '+' : ''}${d.amount.toFixed(2)}`
  }));
};

const columns = [{
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
  render(text) {
    return <a href="#">{text}</a>;
  }
}, {
  title: '用户ID',
  dataIndex: 'ID',
  key: 'ID'
},{
  title: '用户真实姓名',
  dataIndex: 'realname',
  key: 'realname'
},{
  title: '    操作',
  key: 'operation',
  render(text, record) {
    return (
      <div>
      <span>
        <Button className={styles.addBtn}>
        通过
        </Button>
      </span>
      <span>
        <Button className={styles.addBtn}>
        拒绝
        </Button>
      </span>
      </div>
    );
  }
}];

const data = [{
  key: '1',
  name: 'Shirley',
  ID: '3130100668',
  realname: '陈雪儿'
}, {
  key: '2',
  name: 'Mark',
  ID: '3130100669',
  realname: '马总'
}, {
  key: '3',
  name: 'Harry',
  ID: '3130100670',
  realname: '破特'
}];

const datatest = Array(60).fill({
  name: 'Shirley',
  ID: '3130100668',
  realname: '陈雪儿'
});

const datanull=null;//暂无数据这个是哪里写的？

class AdminVerify extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Table
               className={styles.table}
               columns={columns}
               dataSource={datatest}
               {...tableProps}/>
      </div>
    );
  }
}

export default AdminVerify;
