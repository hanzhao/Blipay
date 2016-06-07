import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { asyncConnect } from 'redux-connect';
import { Input, Col, Table, Button, Modal } from 'antd';
import store from '../../redux/store';
import { getArbitrationList,dealArbitration } from '../../redux/modules/admin';
import ajax from '../../common/ajax';
import styles from './styles';

//给table的数据集每个元素加上key
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

//弹窗显示细节
function showDetail(title,content){
  Modal.info({
    title,
    content: (
      <div>
        <p>{content}</p>
      </div>
    ),
    onOk() {}
  });
}

const ops = { acceptOp: 'accept',denyOp: 'deny'}

const dealArbitrationInTable = (id,op) => {
  store.dispatch(dealArbitration({id,op}));
  store.dispatch(getArbitrationList());
}

//定义表头以及每行渲染
const columns = [{
  title: '投诉方',
  dataIndex: 'userName',
  key: 'userName'
},{
  title: '被投诉方',
  dataIndex: 'complained',
  key: 'complained'
},{
  title: '投诉方理由',
  dataIndex: 'buyerText',
  key: 'buyerText',
  render(text){
    return(
      <div>
        <Button className={styles.addBtn} onClick={showDetail.bind(this,'投诉方理由',text)}>
        点击查看
        </Button>
      </div>
    );
  }
},{
  title: '被投诉方理由',
  dataIndex: 'sellerText',
  key: 'sellerText',
  render(text){
    return(
      <div>
        <Button className={styles.addBtn} onClick={showDetail.bind(this,'投诉方理由',text)}>
        点击查看
        </Button>
      </div>
    );
  }
},{
  title: '操作',
  dataIndex: 'id',
  key: 'id',
  render(text){
    return(
      <div>
          <Button id={text} className={styles.addBtn} onClick={dealArbitrationInTable.bind(this,text,ops.acceptOp)}>
            通过
          </Button>
          <Button id={text} className={styles.addBtn} onClick={dealArbitrationInTable.bind(this,text,ops.denyOp)}>
            拒绝
          </Button>
      </div>
    );
  }
}];

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
