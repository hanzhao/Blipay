/*
 * 每日生成最新帳單
 */
import React from 'react';
import _ from 'lodash';
import { asyncConnect } from 'redux-connect';
import { Form, DatePicker, Button } from 'antd';
import AuditRecordTable from '../AuditRecordTable';
import FormModal from '../FormModal';
import styles from './styles';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import moment from 'moment';
import {
  logout,
  loadTransactions,
  insertData,
  toggleAddinfo,
  addinfo
} from '../../redux/modules/auditor';

const RangePicker = DatePicker.RangePicker;

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的交易记录的最大数目 */
    pageSize: Math.max(1, Math.floor((window.innerHeight - 350) / 50))
  }
};

const validateId = async (rule, value, callback) => {
  try {
    await ajax.post('/api/auditor/check_recordid', {
      //payPass: value
      id:value
    });
    callback();
  } catch (err) {
    callback(new Error('不存在该订单记录。'));
  }
};

const validateInfo = (rule, value, callback) => {
  if (!value) {
    callback();
  } else {
    if (value.length < 30) {
      callback();
    } else {
      callback(new Error('备注过长。'));
    }
  }
};

const addinfoPropsArray = [
  {
    input: {
      placeholder: '请输入订单流水号',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'id', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: validateId }]
      }
    ]
  },
  {
    input: {
      placeholder: '请输入备注 ',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'info', {
        rules: [{ required: true }, { validator: validateInfo }]
      }
    ]
  }
];

const getFlowHead = (flow) => {
  if (isNaN(flow))
    return '0';
  else
    return (flow.toFixed(2) + '').split('.')[0];
};

const getFlowTail = (flow) => {
  if (isNaN(flow))
    return '00';
  else
    return (flow.toFixed(2) + '').split('.')[1];
};


@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadTransactions());
    }
  }],
  (state) => ({
    user: state.auditor.user,
    transactions: _.reverse(_.slice(state.auditor.transactions)),
    showAddinfoModal: state.auditor.showAddinfoModal
  }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
    toggleAddinfo: () => dispatch(toggleAddinfo()),
    handleAddinfo: (data) => dispatch(addinfo(data)),
    insertData: () => dispatch(insertData())
  })
)
class AuditLatestRecordPage extends React.Component {
  state = {
    range: [new Date(0), new Date()]
  }
  handleChange = (value) => {
    this.setState({
      range: [value[0], value[1]]
    })
  }
  render() {
    var transactions = this.props.transactions.filter((e) =>
      e.createdAt >= this.state.range[0] && e.createdAt <= this.state.range[1]
    )
    var i=0;
    var flow=0;
    while(i<transactions.length){
    	flow=flow+transactions[i].totalCost;
    	i++;
    }
    return (
      <div className={styles.container}>
        <div className={styles.mypicker}>
          <RangePicker className={styles.picker}
                     showTime
                     onChange={this.handleChange} />
        </div>
        <div className={styles.balanceValue}>
                <span className={styles.flowHead}>
                  选择时间范围内交易总额：￥{ getFlowHead(flow) }.
                </span>
                <span className={styles.flowTail}>
                  { getFlowTail(flow) }
                </span>

                <span className={styles.flowCount}>
                  &nbsp;&nbsp;&nbsp;&nbsp;交易记录总数：{transactions.length}
                </span>
        </div>
        <div className={styles.mybutton}>
                 <Button className={styles.withdrawal}
                        onClick={this.props.toggleAddinfo}>
                  添加备注
                </Button>
                <Button className={styles.withdrawal}
                        onClick={this.props.insertData}>
                  插入
                </Button>

        </div>
      <div className={styles.wrapper}>
         <AuditRecordTable
          className={styles.table}
          data={transactions}
          tableProps={tableProps} />
      </div>
      <FormModal title="添加备注"
                   visible={this.props.showAddinfoModal}
                   num={2}
                   btnText="确认"
                   propsArray={addinfoPropsArray}
                   btnCallback={this.props.handleAddinfo}
                   toggleModal={this.props.toggleAddinfo} />
    </div>
    
    );
  }
}

export default AuditLatestRecordPage;