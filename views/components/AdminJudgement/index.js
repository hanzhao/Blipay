import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { Input, Col, Table, Button } from 'antd';
import store from '../../redux/store';
import { getArbitrationList } from '../../redux/modules/admin';

import styles from './styles';


const columns = [{
  title: '投诉方',
  dataIndex: 'userName',
  key: 'userName'
},{
  title: '被投诉方',
  dataIndex: 'complained',
  key: 'complained'
},{
  title: '投诉细节',
  key: 'content',
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

// const datatest = Array(60).fill({
//   userName: 'gg',
//   complained: '213048574393'
// });
//
// const data = [{
//   key: '1',
//   userName: 'wzy',
//   complained: '012345267908'
// },{
//   key: '2',
//   userName: 'al',
//   complained: '836410284675'
// },{
//   key: '3',
//   userName: 'www',
//   complained: '023422567908'
// }];
function addKey(data){
  let res = new Array()
  for(let i = 0; i < data.length ;i++){
    res.push({
      ...data[i],
      key:i
    });
  }
  return res;
}

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(getArbitrationList());
    }
  }],
  (state) => ({
    adminer: state.admin.adminer,
    arbitrationList: state.admin.arbitrationList
  }),
  (dispatch) => ({
  })
)

class AdminJudgement extends React.Component {
  render() {
    const {adminer,arbitrationList} = this.props;
    console.log(arbitrationList);
    return (
      <div className={styles.container}>
        <Table text
               className={styles.table}
               columns={columns}
               dataSource={addKey(arbitrationList||[])} />
      </div>
    );
  }
}

export default AdminJudgement;
