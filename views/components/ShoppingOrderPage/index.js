import React from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router'
import { Modal, Form, Input, InputNumber, Rate, message } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { Pagination } from 'antd';
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
  toggleShoppingReview,
  toggleShoppingRefund,
  toggleShoppingRefundConfirm,
  pay_order,
  ship_order,
  confirmReceive,
  refundReq
} from '../../redux/modules/shopping';


const createForm = Form.create;
const FormItem = Form.Item;
let ORDERS = [];
let contents = [];
let reviewVisible = [];
let refundVisible = [];
let confirmVisible = [];
let reviews = [];



// let userId = 0;
const pay = function (id) {
  store.dispatch(pay_order(id));
}

const ship = function (id) {
  store.dispatch(ship_order(id));
}


// const review = async function () {
//   console.log(reviews);
//   console.log(this);
//   await ajax.post('/api/order/update', {
//     orderId: this.orderId,
//     op: 'confirm',
//     reviews: reviews
//   });
//   contents[this.index].status = 4;
//   this.view.setState({});
// }



const toggleReviewModal = function (order) {
  store.dispatch(toggleShoppingReview(order));
}

const toggleRefundModal = function (orderId) {
  store.dispatch(toggleShoppingRefund(orderId));
}

const toggleRefundConfirmModal = function () {
  store.dispatch(toggleShoppingRefundConfirm());
}




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
  reviews = [];
  render() {
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
@reduxForm({
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
        onCancel={toggleRefundModal.bind(this, undefined) }>
        <Form>
          <FormItem label="退货理由">
            <Input type='textarea' {...reason} />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

// let showShoppingRefundConfirmModal = false;
// class ShoppingRefundConfirmModal extends React.Component {
//   render() {
//     return (
//       <Modal title="退货申请"
//         visible={confirmVisible[this.props.index]}
//         view={this.props.view}
//         index={this.props.index}
//         orderId={this.props.orderId}
//         onCancel={toggleRefundConfirmModal}>
//         <Form>
//           <FormItem label="退货理由">
//             <Input type='textarea' disabled={true} />
//           </FormItem>
//         </Form>
//       </Modal>
//     )
//   }
// }


@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadOrders())
    }
  }],
  (state) => ({
    orders: state.shopping.orders.map((e, i) => ({ ...e, key: i })),
userId: state.account.user.id
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
              return <Button type="ghost" onClick={ pay.bind(this, record.id) }>确认付款</Button>
            else if (this.props.userId == record.sellerId)
              return <spin>等待付款</spin>
            break;
          case 1:
            if (this.props.userId == record.sellerId)
              return <Button type="ghost" onClick={ ship.bind(this, record.id) }>确认发货</Button>
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
              return <Button type="ghost" onClick={toggleRefundConfirmModal}>处理退货请求</Button>
          default:
        }
      }
    }
  ];
  render() {
    const {orders} = this.props;
    console.log(orders);
    const pagination = {
      total: contents.length,
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
      </div>
    );
  }
}
export default ShoppingOrderPage;
