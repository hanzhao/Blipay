import React from 'react';

import { Input, Col, Table, Button } from 'antd';

import styles from './styles';


const columns = [{
  title: '投诉方',
  dataIndex: 'sname',
  key: 'sname'
},{
  title: '被投诉方',
  dataIndex: 'mname',
  key: 'mname'
},{
  title: '投诉细节',
  key: 'operation',
  render(){
    return(
      <div>
      <span>
        <Button className={styles.addBtn}>
        细节
        </Button>
      </span>
      </div>
    );
  }
},{
  title: ' ',
  key: '  ',
  render(){
    return(
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

const datatest = Array(60).fill({
  sname: 'gg',
  mname: '213048574393'
});

const data = [{
  key: '1',
  sname: 'wzy',
  mname: '012345267908'
},{
  key: '2',
  sname: 'al',
  mname: '836410284675'
},{
  key: '3',
  sname: 'www',
  mname: '023422567908'
}];

class AdminJudgement extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <Table text
               className={styles.table}
               columns={columns}
               dataSource={data} />
      </div>
    );
  }
}

export default AdminJudgement;
