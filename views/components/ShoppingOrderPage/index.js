import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router'
import { Modal, Form, Input, InputNumber, Rate, message, Cascader } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { Pagination } from 'antd';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

import pic from './akarin.png'
import styles from './styles';
import ShoppingPageHeader from '../ShoppingPageHeader';
import FormModal from '../FormModal';
import { Table } from 'antd';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import classNames from 'classnames';
import { reduxForm, addArrayValue } from 'redux-form';

import {
  loadOrders,
  toggleShoppingPay,
  toggleShoppingShip,
  toggleShoppingReview,
  toggleShoppingRefund,
  toggleShoppingRefundConfirm,
  payOrder,
  shipOrder,
  confirmReceive,
  refundReq,
  refundConfirmSetAgree,
  refundConfirmAgree,
  refundConfirmRefuse
} from '../../redux/modules/shopping';

const FormItem = Form.Item;

const pay = function (order) {
  // store.dispatch(payOrder(order));
  Modal.confirm({
    title: '确认支付',
    content: '共 ' + order.totalCost + ' 元',
    onOk() {
      store.dispatch(payOrder(order.id));
    },
    onCancel() { },
  })
}

const ship = function (order) {
  // store.dispatch(shipOrder(order));
  Modal.confirm({
    title: '确认发货',
    content: '地址:\t' + order.addr,
    onOk() {
      store.dispatch(shipOrder(order.id));
    },
    onCancel() { },
  })
}

const toggleReviewModal = function (order) {
  store.dispatch(toggleShoppingReview(order));
}

const toggleRefundModal = function (orderId) {
  store.dispatch(toggleShoppingRefund(orderId));
}

const toggleRefundConfirmModal = function (order) {
  store.dispatch(toggleShoppingRefundConfirm(order));
}


// @connect(
//   (state) => ({
//     order: state.shopping.payOrder,
//     visible: state.shopping.showPayModal
//   }),
//   (dispatch) => ({
//     pay: (orderId) => dispatch(payOrder(orderId))
//   })
// )
// class ShoppingPayModal extends React.Component {
//   render() {

//   }
// }

// @connect(
//   (state) => ({
//     order: state.shopping.shipOrder,
//     visible: state.shopping.showShipModal
//   }),
//   (dispatch) => ({
//     ship: (orderId) => dispatch(shipOrder(orderId))
//   })
// )
// class ShoppingShipModal extends React.Component {
//   render() {

//   }
// }

@connect(
  (state) => ({
    showReviewModal: state.shopping.showReviewModal,
    order: state.shopping.reviewOrder
  }),
  (dispatch) => ({
    confirm: (orderId, reviews) => dispatch(confirmReceive(orderId, reviews))
  })
)
class ShoppingReviewModal extends React.Component {
  render() {
    let reviews = [];
    const { order, confirm } = this.props;
    const handler = () => {
      console.log(reviews)
      confirm(order.id, reviews)
    }
    const onScoreChanged = (index, score) => {
      reviews[index].score = score;
    }
    const onTextChanged = (index, e) => {
      reviews[index].text = e.target.value;
    }
    let items = [];
    if (order)
      items = order.items
    reviews = Array(items.length).fill({ score: 5, text: 'Default' });
    return (
      <Modal title="商品评价"
        visible={this.props.showReviewModal}
        onOk={handler}
        onCancel={toggleReviewModal.bind(this, undefined) }
        >
        <Form>
          {
            items.map((e, i) => (
              <FormItem key={i}>
                <div>商品名</div>
                <span>{items[i].name}</span>
                <div>评分</div>
                <span>
                  <Rate defaultValue={5} onChange={onScoreChanged.bind(this, i) }/>
                </span>
                <div>评价</div>
                <Input onChange={onTextChanged.bind(this, i) } />
              </FormItem>
            ))
          }
        </Form>
      </Modal>
    )
  }
}


@connect(
  (state) => ({
    showRefundModal: state.shopping.showRefundModal,
    orderId: state.shopping.refundOrderId
  }),
  (dispatch) => ({
    refundRequest: (id, reason) => dispatch(refundReq(id, reason))
  })
)
@reduxForm(
  {
    form: 'refund',
    fields: ['reason']
  }, undefined, {
    onSubmit: (data) => { }
  })
class ShoppingRefundModal extends React.Component {

  render() {
    const {fields: {
      reason
    }, refundRequest, orderId} = this.props;
    const handler = () => {
      console.log(orderId)
      console.log(reason.value)
      refundRequest(orderId, reason.value)
    }
    return (
      <Modal title="退货申请"
        visible={this.props.showRefundModal}
        onOk={handler}
        onCancel={toggleRefundModal.bind(this) }>
        <Form>
          <FormItem label="退货理由">
            <Input type='textarea' {...reason} />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}


@connect(
  (state) => ({
    showRefundConfirmModal: state.shopping.showRefundConfirmModal,
    order: state.shopping.refundConfirmOrder,
    agree: state.shopping.refundConfirmAgree
  }),
  (dispatch) => ({
    setAgree: (agree) => dispatch(refundConfirmSetAgree(agree)),
    agreeRefund: (orderId) => dispatch(refundConfirmAgree(orderId)),
    refuseRefund: (orderId, reason) => dispatch(refundConfirmRefuse(orderId, reason))
  })
)
@reduxForm(
  {
    form: 'refundConfirm',
    fields: ['reason']
  }, undefined, {
    onSubmit: (data) => { }
  })
class ShoppingRefundConfirmModal extends React.Component {
  render() {
    const {fields: {reason}, order, agree, agreeRefund, refuseRefund} = this.props;
    let buyerReason = ''
    if (this.props.order)
      buyerReason = this.props.order.buyerText
    const submit = function () {
      if (agree)
        agreeRefund(order.id)
      else
        refuseRefund(order.id, reason.value)
    }
    return (
      <Modal title="退货处理"
        visible={this.props.showRefundConfirmModal}
        onOk={submit}
        onCancel={toggleRefundConfirmModal}>
        退货理由
        <span>{buyerReason}</span>
        <RadioGroup defaultValue={true} onChange={(e) => this.props.setAgree(e.target.value) }>
          <Radio key={0} value={true}> 同意 </Radio>
          <Radio key={1} value={false}> 拒绝 </Radio>
        </RadioGroup>
        <Form className={agree ? styles.inVisible : styles.visible}>
          <FormItem label="拒绝理由">
            <Input type='textarea' {...reason}/>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}




@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadOrders())
    }
  }],
  (state) => ({
    userId: state.account.user.id,
    orders: state.shopping.orders.map((e, i) => ({ ...e, key: i }))
  })
)
class ShoppingOrderPage extends React.Component {
  columns = [
    {
      title: '订单号',
      dataIndex: 'id',
      key: 'id'
    }, {
      title: '宝贝',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          {
            record.items.map((item, i) => (
              <div key={i} className={styles.itemPrice}>
                <Link to={`/shopping/item/${item.id}`}>{ item.name }</Link>
              </div>
            ))
          }
        </div>
      )
    }, {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <div>
          {
            record.items.map((item, i) => (
              <div key={i} className={styles.itemPrice}>
                {item.price.toFixed(2) }
              </div>
            ))
          }
        </div>
      )
    }, {
      title: '总数量',
      dataIndex: 'count',
      key: 'count',
    }, {
      title: '订单金额',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (d) => {
        return <span className={styles.itemTotalCost}>{Number(d).toFixed(2) }</span>;
      }
    }, {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        switch (record.status) {
          case 0:
            if (this.props.userId == record.buyerId)
              return <Button type="ghost" onClick={ pay.bind(this, record) }>确认付款</Button>
            else if (this.props.userId == record.sellerId)
              return <spin>等待付款</spin>
            break;
          case 1:
            if (this.props.userId == record.sellerId)
              return <Button type="ghost" onClick={ ship.bind(this, record) }>确认发货</Button>
            else if (this.props.userId == record.buyerId)
              return <spin>等待发货</spin>
            break;
          case 2:
            if (this.props.userId == record.buyerId)
              return <Button type="ghost" onClick={toggleReviewModal.bind(this, record) }>确认收货</Button>
            else if (this.props.userId == record.sellerId)
              return <spin>等待收货</spin>
            break;
          case 3:
            if (this.props.userId == record.buyerId)
              return <Button type="ghost" onClick={toggleRefundModal.bind(this, record.id) }>退货申请</Button>
            else if (this.props.userId == record.sellerId)
              return <spin>对方已收货</spin>
            break;
          case 4:
            if (this.props.userId == record.sellerId)
              return <Button type="ghost" onClick={toggleRefundConfirmModal.bind(this, record) }>处理退货请求</Button>
            return <spin>等待退货</spin>
          case 5:
            return <spin>完成退货</spin>
          case 6:
            return <spin>等待仲裁</spin>
          case 7:
            return <spin>仲裁退款</spin>
          case 8:
            return <spin>仲裁不退款</spin>
          default:
        }
      }
    }
  ];
  render() {
    const {orders} = this.props;
    console.log(orders);
    const pagination = {
      total: orders.length,
      showSizeChanger: true,
      pageSize: 10,
      onShowSizeChange(current, pageSize) {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange(current) {
        console.log('Current: ', current);
      },
    };
    return (
      <div>
        <ShoppingPageHeader icon="exception" text="订单管理" />
        <div className={styles.table}>
          <Table className={styles.shoppingOrderTable} columns={this.columns} dataSource={orders} pagination={pagination} />
        </div>
        <ShoppingReviewModal/>
        <ShoppingRefundModal/>
        <ShoppingRefundConfirmModal />
      </div>
    );
  }
}
export default ShoppingOrderPage;
