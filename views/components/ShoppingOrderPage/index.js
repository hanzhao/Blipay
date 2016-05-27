import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
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

const createForm = Form.create;
const FormItem = Form.Item;
let ORDERS = [];
let contents = [];
let reviewVisible = [];
let refundVisible = [];
let confirmVisible = [];
let reviews = [];

let userId = 0;
const pay = async function () {
  try {
    await ajax.post('/api/order/update', {
      orderId: this.orderId,
      op: 'pay'
    });
    console.log('Pay');
    message.success('付款成功');
    contents[this.index].status = 1;
    this.view.setState({});
  } catch (e) {
    message.error('账户余额不足以支付订单')
  }
}

const ship = async function () {
  await ajax.post('/api/order/update', {
    orderId: this.orderId,
    op: 'ship'
  });
  console.log('Ship');
  message.success('发货成功');
  contents[this.index].status = 2;
  this.view.setState({});
}

// const confirm = async function () {
//   await ajax.post('/api/order/update', {
//     orderId: this.orderId,
//     op: 'confirm'
//   });
//   console.log('Confirm');
//   message.success('收货成功');
//   contents[this.index].status = 3;
//   showShoppingReviewModal = !showShoppingReviewModal;
//   this.view.setState({});
// }

const review = async function () {
  console.log(reviews);
  console.log(this);
  await ajax.post('/api/order/update', {
    orderId: this.orderId,
    op: 'confirm',
    reviews: reviews
  });
  contents[this.index].status = 4;
  this.view.setState({});
}



const toggleReviewModal = function () {
  reviewVisible[this.index] = !reviewVisible[this.index];
  this.view.setState({});
}

const toggleRefundModal = function () {
  refundVisible[this.index] = !refundVisible[this.index];
  this.view.setState({});
}

const toggleRefundConfirmModal = function () {
  confirmVisible[this.index] = !confirmVisible[this.index];
  this.view.setState({});
}

let tableProps =
  {
    pagination:
    {
      simple: true,
      pageSize: 6
    }
  };
let columns = [{
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
  render: (d) => {
    switch (d.status) {
      case 0:
        return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={pay}>确认付款</Button>
      case 1:
        if (userId == d.sellerId)
          return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={ship}>确认发货</Button>
        else if (userId == d.buyerId)
          return <Button disable='true' type="ghost" onClick={ship}>等待发货</Button>
      case 2:
        return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={toggleReviewModal}>确认收货</Button>
      case 3:
        if (userId == d.buyerId)
          return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={toggleRefundModal}>退货申请</Button>
      case 4:
        if (userId == d.sellerId)
          return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={toggleRefundConfirmModal}>退货确认</Button>
      default:
    }

  }
}, {
  title: '',
  dataIndex: 'modal',
  key: 'modal',
  render: (d) => {
    return (
      <div>
        <ShoppingReviewModal index={d.index} orderId={d.orderId} view={d.view} />
        <ShoppingRefundModal index={d.index} orderId={d.orderId} view={d.view} />
        <ShoppingRefundConfirmModal index={d.index} orderId={d.orderId} view={d.view} />
      </div>
    )
  }
}];
let showShoppingReviewModal = false;
class ShoppingReviewModal extends React.Component {
  onChangeScore(e) {
    reviews[this.id].score = e;
  }
  onChangeText(e) {
    reviews[e.target.id].text = e.target.value;
  }
  render() {
    console.log('Modal Loaded');
    console.log(this);
    console.log(ORDERS);
    const items = ORDERS[this.props.index].items;
    if (reviewVisible[this.props.index]) {
      reviews = []
      for (var index = 0; index < items.length; index++) {
        items[index]['index'] = index;
        reviews.push({
          score: 5,
          text: 'Default'
        })
      }
    }
    console.log(items);
    return (
      <Modal title="商品评价"
        visible={reviewVisible[this.props.index]}
        view={this.props.view}
        index={this.props.index}
        orderId={this.props.orderId}
        items={items}
        onOk={review}
        onCancel={toggleReviewModal}>
        <Form>
          {
            items.map((e, i) => (
              <div key={i}>
                <span>{e.name}</span>
                <div>评分</div>
                <span>
                  <Rate defaultValue={5} onChange={this.onChangeScore} />
                </span>
                <div>评价</div>
                <Input id={e.index} onChange={this.onChangeText}/>
              </div>
            ))
          }
        </Form>
      </Modal>
    )
  }
}

let showShoppingRefundModal = false;
class ShoppingRefundModal extends React.Component {


  render() {
    return (
      <Modal title="退货申请"
        visible={refundVisible[this.props.index]}
        view={this.props.view}
        index={this.props.index}
        orderId={this.props.orderId}
        onCancel={toggleRefundModal}>
        <Form>
          <FormItem label="退货理由">
            <Input type='textarea' />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

let showShoppingRefundConfirmModal = false;
class ShoppingRefundConfirmModal extends React.Component {
  render() {
    return (
      <Modal title="退货申请"
        visible={confirmVisible[this.props.index]}
        view={this.props.view}
        index={this.props.index}
        orderId={this.props.orderId}
        onCancel={toggleRefundConfirmModal}>
        <Form>
          <FormItem label="退货理由">
            <Input type='textarea' disabled={true} />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}


let BasicDemo = React.createClass(
  {
    componentDidMount: async function () {
      const res = await ajax.post('/api/order/order_list', { buyerId: 1 });
      console.log('buyresult', res);
      Object.assign(contents, res.orders);
      ORDERS = res.orders;
      for (var index = 0; index < contents.length; index++) {
        var element = contents[index];
        reviewVisible.push(false);
        refundVisible.push(false);
        confirmVisible.push(false);
        element['key'] = element.id;
        element['status'] = {
          index: index,
          sellerId: element.sellerId,
          buyerId: element.buyerId,
          orderId: element.id,
          status: element.status,
          view: this
        };
        element['modal'] = {
          index: index,
          sellerId: element.sellerId,
          buyerId: element.buyerId,
          orderId: element.id,
          status: element.status,
          view: this
        }
      }
      // contents.forEach(function (element) {
      //   element['key'] = element.id,
      //     element['status'] = {
      //       sellerId: element.sellerId,
      //       buyerId: element.buyerId,
      //       orderId: element.id,
      //       status: element.status,
      //       refresh: this.setState
      //     }
      // }, this);
      //console.log(contents);
      this.setState({});
    },
    render() {
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
          <Table className={styles.shoppingOrderTable} columns={columns} dataSource={contents} pagination={pagination} />
        </div>
      );
    }
  });


@connect(
  (state) => ({
    user: state.account.user
  })
)
class ShoppingOrderPage extends React.Component {
  render() {
    const {user} = this.props;
    console.log(user);
    userId = user.id;
    return (
      <div>
        <ShoppingPageHeader icon="exception" text="订单管理" />
        <div className={styles.table}>
          <BasicDemo />
        </div>

      </div>
    );
  }
}
BasicDemo = createForm()(BasicDemo);
export default ShoppingOrderPage;
