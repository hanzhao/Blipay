import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, message } from 'antd';
import { Button } from 'antd';
import { InputNumber } from 'antd';
import pic from './akarin.png'
import styles from './styles';
import FormModal from '../FormModal';
import { Table } from 'antd';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import classNames from 'classnames';

const createForm = Form.create;
const FormItem = Form.Item;

let contents = [];
let userId = 0;
const pay = async function () {
  await ajax.post('/api/order/update', {
    orderId: this.orderId,
    op: 'pay'
  });
  console.log('Pay');
  message.success('付款成功');
  contents[this.index].status = 1;
  this.view.setState({});
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

const confirm = async function () {
  await ajax.post('/api/order/update', {
    orderId: this.orderId,
    op: 'confirm'
  });
  console.log('Confirm');
  message.success('收货成功');
  contents[this.index].status = 3;
  showShoppingReviewModal = !showShoppingReviewModal;
  this.view.setState({});
}

const toggleReviewModal = function () {
  showShoppingReviewModal = !showShoppingReviewModal;
  this.view.setState({});
}

const toggleRefundModal = function () {
  showShoppingRefundModal = !showShoppingRefundModal;
  this.view.setState({});
}

const toggleRefundConfirmModal = function () {
  showShoppingRefundConfirmModal = !showShoppingRefundConfirmModal;
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
  title: '',
  dataIndex: 'thumb',
  key: 'thumb',
  render: (d, e) => {
    return <img src={e.items[0].thumb}  className={styles.itemImage}/>
  }
}, {
    title: '宝贝',
    dataIndex: 'name',
    key: 'name',
    render: (d, e) => {
      return <span className={styles.itemName}>{e.items[0].name}</span>;
    }
  }, {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
    render: (d, e) => {
      return <span className={styles.itemPrice}>{Number(e.items[0].price).toFixed(2) }</span>;
    }
  }, {
    title: '数量',
    dataIndex: 'count',
    key: 'count'
  }, {
    title: '订单编号',
    dataIndex: 'id',
    key: 'id'
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
      console.log(d);
      switch (d.status) {
        case 0:
          return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={pay}>确认付款</Button>
        case 1:
          if (userId == d.sellerId)
            return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={ship}>确认发货</Button>
          else if (userId == d.buyerId)
            return <Button disable='true' type="ghost" onClick={ship}>等待发货</Button>
        case 2:
          return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={confirm}>确认收货</Button>
        case 3:
          if (userId == d.buyerId)
            return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={toggleRefundModal}>退货申请</Button>
        case 4:
          if (userId == d.sellerId)
            return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={toggleRefundConfirmModal}>退货确认</Button>
        default:
        
      }

    }
  }];

let showShoppingReviewModal = false;
class ShoppingReviewModal extends React.Component {
  render() {
    return (
      <Modal title="商品评价"
             visible={showShoppingReviewModal}
             view={this}
             onCancel={toggleReviewModal}>
        <Form>
          <FormItem label="评分">
            <InputNumber min={0} max={5} defaultValue={0} />
          </FormItem>
          <FormItem label="评价">
            <Input type='textarea' className={classNames({
                [styles.review]: true,
                [styles.input]: true
              })} />
          </FormItem>
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
             visible={showShoppingRefundModal}
             view={this}
             onCancel={toggleRefundModal}>
        <Form>
          <FormItem label="退货理由">
            <Input type='textarea' />
          </FormItem>
          <Button type="primary" htmlType="submit">确定</Button>
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
             visible={showShoppingRefundConfirmModal}
             view={this}
             onCancel={toggleRefundConfirmModal}>
        <Form>
          <FormItem label="退货理由">
            <Input type='textarea' disabled={true} />
          </FormItem>
          <Button type="primary" htmlType="submit">确定</Button>
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
      for (var index = 0; index < contents.length; index++) {
        var element = contents[index];
        element['key'] = element.id;
        element['status'] = {
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
        pageSize: 20,
        onShowSizeChange(current, pageSize) {
          console.log('Current: ', current, '; PageSize: ', pageSize);
        },
        onChange(current) {
          console.log('Current: ', current);
        },
      };
      return (
        <div>
          <ShoppingReviewModal onCancel={this.props.toggleShoppingReview}/>
          <ShoppingRefundModal onCancel={this.props.toggleShoppingRefund}/>
          <ShoppingRefundConfirmModal onCancel={this.props.toggleShoppingRefundConfirm}/>
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
      <BasicDemo />
    );
  }
}
BasicDemo = createForm()(BasicDemo);
export default ShoppingOrderPage;
