import React from 'react';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import { Card, Icon, Pagination, Input, Form, Select, Button, Cascader } from 'antd';
import QueueAnim from 'rc-queue-anim';
import jsonp from 'jsonp';
import querystring from 'querystring';
import classNames from 'classnames';

import store from '../../redux/store';
import BookingPageHeader from '../BookingPageHeader';
import { cities } from '../../common/cascaders';
import {
  loadItems
} from '../../redux/modules/booking';

import show from './show.jpg';
import styles from './styles';

let timeout;
let currentValue;

const flightPrice = {
  'hangzhou': {
    'hangzhou': '请选择不同的出发地和目的地',
    'nanjing': '1080',
    'shanghai': '580'
  }, 'nanjing': {
    'hangzhou': '1080',
    'nanjing': '请选择不同的出发地和目的地',
    'shanghai': '780'
  }, 'shanghai': {
    'hangzhou': '580',
    'nanjing': '780',
    'shanghai': '请选择不同的出发地和目的地'
  }
};


const flightCompany = [
  '中国国际航空股份有限公司',
  '中国东方航空股份有限公司',
  '中国南方航空股份有限公司',
  '春秋航空有限公司'
];

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadItems());
    }
  }],
  (state) => ({
    items: state.shopping.items
  })
)

class BookingInfoPage extends React.Component {
  state = {
    current: 1,
    filter: '',
    fromPosition: '',
    toPosition: ''
  }
  handleClick = (id) => {
    store.dispatch(push(`/shopping/item/${id}`));
  }
  handlePagination = (current) => {
    this.setState({ current });
  }
  handleFilter = (e) => {
    this.setState({
      filter: e
    });
  }
  getPageSize = () => {
    const right = document.getElementById('booking-right');
    if (right) {
      const { width, height } = right.getBoundingClientRect();
      return Math.floor(width / 270) * Math.floor((height - 200) / 310);
    } else {
      setTimeout(() => this.forceUpdate(), 1);
      return 1;
    }
  }
  onChangeFromPosition = (value) => {
    if (value.length > 1) {
      this.setState({ fromPosition: value[1] });
    } else {
      this.setState({ fromPosition: '' });
    }
  }
  onChangeToPosition = (value) => {
    if (value.length > 1) {
      this.setState({ toPosition: value[1] });
    } else {
      this.setState({ toPosition: '' });
    }
  }
  render() {
    const pageSize = this.getPageSize();
    const { current } = this.state;
    let textL = (this.state.fromPosition != '' && this.state.toPosition != '') ? flightPrice[this.state.fromPosition][this.state.toPosition] : '';
    let items = [];
    if (textL != '' && textL != '请选择不同的出发地和目的地') {
      items = Array(4).fill({ price: textL });
    }
    return (
      <div>
        <BookingPageHeader icon="info-circle-o" text="航班预订" />
        <div className={styles.flex}>
          <div className={styles.position}>
            出发地：
            <Cascader options={cities.provs} onChange={this.onChangeFromPosition} placeholder="请选择地区" />
          </div>
          <div className={styles.position}>
            目的地:
            <Cascader options={cities.provs} onChange={this.onChangeToPosition} placeholder="请选择地区" />
          </div>
          <div className={styles.position}>
            <Button type="primary">
              搜索航班
            </Button>
          </div>
        </div>
        {
          (textL == '' || textL == '请选择不同的出发地和目的地')
          ? <span>{textL}</span>
          :
          <Form>
            {
              items.map((e, i) => (
                <Form.Item key={i}>
                  <div className={styles.flex}>
                    <div className={styles.position}>
                      <span>{flightCompany[i]}</span>
                    </div>
                    <div className={styles.position}>
                      <span>￥{e.price}</span>
                    </div>
                  </div>
                </Form.Item>
              ))
            }
          </Form>
        }
      </div>
    );
  }
}
export default BookingInfoPage;
