/*
 * Admin for users' verification
*/
import React from 'react';
import { Link } from 'react-router';
import { Input, Button, Col, Table} from 'antd';
import styles from './styles';

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的用户验证请求的最大数目 */
    pageSize: Math.floor((window.innerHeight - 350) / 50)
  }
};

/*
const wrapAmount = (data) => {
  return data.map((d, index) => ({
    ...d,
    key: index,
    amount: `${d.amount > 0 ? '+' : ''}${d.amount.toFixed(2)}`
  }));
};
*/

const columns = [{
  title: '用户名',
  dataIndex: 'name',
  key: 'name',
  sorter: (a, b) => a < b ? -1: 1,
  render(text) {
    return <Link to="/admin/account/verification/detail">{text}</Link>;
  }
}, {
  title: '用户ID',
  dataIndex: 'id',
  key: 'id',
  sorter: (a, b) => a < b ? -1: 1
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
}/*,{
  title: '操作',
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
  }*/
];

const data = [{
  key: '1',
  name: 'Shirley',
  id: '3130100668',
  realname: '陈雪儿'
}, {
  key: '2',
  name: 'Mark',
  id: '3130100669',
  realname: '马总'
}, {
  key: '3',
  name: 'Harry',
  id: '3130100670',
  realname: '破特'
}];

const datatest = Array(60).fill({
  name: 'Shirley',
  id: '3130100668',
  realname: '陈雪儿'
});

const datanull=null; //暂无数据这个是哪里写的？antd的Table样式

class AdminVerify extends React.Component {
  render() {
/*     return (
      React.createElement('div', { className: styles.container },
        React.createElement(Table, { text: true, className: styles.table,
                                     columns: columns, dataSource: datatest,
                                     pagination: {

                                     } })
                                   )
    )
    ) */
    return (
      <div className={styles.container}>
        <Table
               className={styles.table}
               columns={columns}
               dataSource={data}
               {...tableProps}/>
      </div>
    );
  }
}

export default AdminVerify;

//跳转：参考AdminWelcomePage： 在需要跳转的内容那个标签前加<Link to="/admin/account/manager"> </Link>

/*
const a = [1, 2, 3]
const b = [...a, 4] // b==[1, 2, 3, 4]

const a = { a: 1, b: 2 }
const b = { ...a, a: 3 } // b { a:3, b:2 }
*/
