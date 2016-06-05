import React from 'react';
import styles from './styles.scss';

import {Radio,Row, Col, Input, Form, DatePicker, Button } from 'antd';
import _ from 'lodash';
import { asyncConnect } from 'redux-connect';
import AuditRecordTable from '../AuditRecordTable';
import FormModal from '../FormModal';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import moment from 'moment';
import {
  logout,
  loadTransactions,
  insertData,
  toggleSearch,
  toggleSearchBuyer,
  toggleSearchSeller,
  searchOrder,
  searchBuyer,
  searchSeller
} from '../../redux/modules/auditor';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

const RangePicker = DatePicker.RangePicker;

const tableProps = {
  pagination: {
    simple: true,
    /* 一页能显示的交易记录的最大数目 */
    pageSize: Math.max(1, Math.floor((window.innerHeight - 350) / 50))
  }
};

const orderPropsArray = [
  {
    input: {
      placeholder: '请输入订单流水号',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'key', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: null }]
      }
    ]
  }
];

const buyerPropsArray = [
  {
    input: {
      placeholder: '请输入买家id',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'key', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: null }]
      }
    ]
  }
];

const sellerPropsArray = [
  {
    input: {
      placeholder: '请输入卖家id',
      type: 'text',
      autoComplete: 'off'
    },
    field: [
      'key', {
        validateTrigger: 'onBlur',
        rules: [{ required: true }, { validator: null }]
      }
    ]
  }
];

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadTransactions());
    }
  }],
  (state) => ({
    user: state.auditor.user,
    transactions: _.reverse(_.slice(state.auditor.transactions)),
    showSearchModal: state.auditor.showSearchModal,
    showBuyerModal: state.auditor.showBuyerModal,
    showSellerModal: state.auditor.showSellerModal
  }),
  (dispatch) => ({
    logout: () => dispatch(logout()),
    toggleSearchOrder: () => dispatch(toggleSearch()),
    toggleSearchBuyer: () => dispatch(toggleSearchBuyer()),
    toggleSearchSeller: () => dispatch(toggleSearchSeller()),
    handleSearchOrder: (data) => dispatch(searchOrder(data)),
    handleSearchBuyer: (data) => dispatch(searchBuyer(data)),
    handleSearchSeller: (data) => dispatch(searchSeller(data))
  })
)
class AuditSearchPage extends React.Component {
  state = {
    range: [new Date(0), new Date()]
  }
  handleChange = (value) => {
    this.setState({
      range: [value[0], value[1]]
    })
  }
  render() {
    const transactions = this.props.transactions.filter((e) =>
      e.createdAt >= this.state.range[0] && e.createdAt <= this.state.range[1]
    )
    return (
      <div className={styles.container}>
        <div className={styles.mypicker}>
        <RangePicker className={styles.picker}
                     showTime
                     onChange={this.handleChange} />
        </div>
        <div className={styles.mybutton}>

                 <Button className={styles.withdrawal}
                        onClick={this.props.toggleSearchOrder}>
                  订单搜索
                </Button>
                <Button className={styles.withdrawal}
                        onClick={this.props.toggleSearchBuyer}>
                  买家搜索
                </Button>
                <Button className={styles.withdrawal}
                        onClick={this.props.toggleSearchSeller}>
                  卖家搜索
                </Button>

               

        </div>
      <div className={styles.wrapper}>
         <AuditRecordTable
          className={styles.table}
          data={transactions}
          tableProps={tableProps} />
      </div>
      <FormModal title="搜索订单"
                   visible={this.props.showSearchModal}
                   num={1}
                   btnText="确认"
                   propsArray={orderPropsArray}
                   btnCallback={this.props.handleSearchOrder}
                   toggleModal={this.props.toggleSearchOrder} />
      <FormModal title="搜索买家"
                   visible={this.props.showBuyerModal}
                   num={1}
                   btnText="确认"
                   propsArray={buyerPropsArray}
                   btnCallback={this.props.handleSearchBuyer}
                   toggleModal={this.props.toggleSearchBuyer} />
      <FormModal title="搜索卖家"
                   visible={this.props.showSellerModal}
                   num={1}
                   btnText="确认"
                   propsArray={sellerPropsArray}
                   btnCallback={this.props.handleSearchSeller}
                   toggleModal={this.props.toggleSearchSeller} />                       
    </div>
    
    );
  }
}

export default AuditSearchPage;
