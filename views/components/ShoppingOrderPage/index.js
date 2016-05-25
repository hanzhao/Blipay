import React from 'react';
import { connect } from 'react-redux';
import { Modal, Menu, Dropdown, Icon, Form, message } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber, Input } from 'antd';
import { Pagination } from 'antd';
import pic from './akarin.png'
import styles from './styles';
import FormModal from '../FormModal';
import { Table } from 'antd';
import { Cascader } from 'antd';
import { reduxForm } from 'redux-form';
import ajax from '../../common/ajax';
import store from '../../redux/store';
import classNames from 'classnames';

const createForm = Form.create;
const FormItem = Form.Item;
let ORDERS = [];
let contents = [];
let visible = [];
let reviews = [];

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
  this.view.setState({});
}

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
  console.log('Review');
  console.log(visible[this.index]);
  visible[this.index] = !visible[this.index];
  console.log(this);
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
      switch (d.status) {
        case 0:
          return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={pay}>确认付款</Button>
        case 1:
          if (userId == d.sellerId)
            return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={ship}>确认发货</Button>
          else if (userId == d.buyerId)
            return <Button disable='true' type="ghost" onClick={ship}>等待发货</Button>
        case 2:
          if (userId == d.buyerId)
            return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={toggleReviewModal}>确认收货</Button>
        // case 3:
        //   return <Button type="ghost" index={d.index} orderId={d.orderId} view={d.view} onClick={toggleReviewModal}>用户评价</Button>
      }

    }
  }, {
    title: '',
    dataIndex: 'modal',
    key: 'modal',
    render: (d) => {
      return <ShoppingReviewModal index={d.index} orderId={d.orderId} view={d.view} />
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
    const items = ORDERS[this.props.index].items;
    if (visible[this.props.index]) {
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
        visible={visible[this.props.index]}
        view={this.props.view}
        index={this.props.index}
        orderId={this.props.orderId}
        items={items}
        onOk={review}
        onCancel={toggleReviewModal}>
        <Form>
          {
            items.map(e => (
              <div>
                <span>{e.name}</span>
                <div>评分</div>
                <InputNumber id={e.index} size="large" min={1} max={5} step={1} defaultValue={5} onChange={this.onChangeScore} />
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

let BasicDemo = React.createClass(
  {
    componentDidMount: async function () {
      const res = await ajax.post('/api/order/order_list', { buyerId: 1 });
      console.log('buyresult', res);
      Object.assign(contents, res.orders);
      ORDERS = res.orders;
      for (var index = 0; index < contents.length; index++) {
        var element = contents[index];
        visible.push(false);
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
      <BasicDemo />
    );
  }
}
BasicDemo = createForm()(BasicDemo);
export default ShoppingOrderPage;
