import React from 'react';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import { Card, Icon, Pagination, Input, Form, Select, Button, Tooltip } from 'antd';
import QueueAnim from 'rc-queue-anim';
import jsonp from 'jsonp';
import querystring from 'querystring';
import classNames from 'classnames';

import store from '../../redux/store';
import ShoppingPageHeader from '../ShoppingPageHeader';
import {
  loadItems,
  toggleSeller
} from '../../redux/modules/shopping';

import show from './show.jpg';
import styles from './styles';

let timeout;
let currentValue;

function fetch(value, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    const str = querystring.encode({
      code: 'utf-8',
      q: value,
    });
    jsonp(`http://suggest.taobao.com/sug?${str}`, (err, d) => {
      if (currentValue === value) {
        const result = d.result;
        const data = [];
        result.forEach((r) => {
          data.push({
            value: r[0],
            text: r[0],
          });
        });
        callback(data);
      }
    });
  }

  timeout = setTimeout(fake, 300);
}

const SearchInput = React.createClass({
  getInitialState() {
    return {
      data: [],
      value: '',
      focus: false,
    };
  },
  handleChange(value) {
    this.setState({ value });
    fetch(value, (data) => this.setState({ data }));
  },
  handleSubmit() {
    this.props.handleSubmit(this.state.value)
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    const options = this.state.data.map(d =>
      <Select.Option key={d.value}>{d.text}</Select.Option>
    );
    return (
      <div className="ant-search-input-wrapper" style={this.props.style}>
        <Input.Group className={searchCls}>
          <Select
            combobox
            value={this.state.value}
            placeholder={this.props.placeholder}
            notFoundContent=""
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onChange={this.handleChange}
            onFocus={this.handleFocusBlur}
            onBlur={this.handleFocusBlur}>
            {options}
          </Select>
          <div className="ant-input-group-wrap">
            <Button className={btnCls} onClick={this.handleSubmit}>
              <Icon type="search" />
            </Button>
          </div>
        </Input.Group>
      </div>
    );
  },
});

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadItems())
    }
  }],
  (state) => ({
    items: state.shopping.items,
    chatUsers: state.shopping.chatUsers
  }),
  (dispatch) => ({
    toggleSeller: (userId) => dispatch(toggleSeller(userId))
  })
)
class ShoppingInfoPage extends React.Component {
  state = {
    current: 1,
    filter: ''
  }
  handleClick = (id) => {
    store.dispatch(push(`/shopping/item/${id}`))
  }
  handlePagination = (current) => {
    this.setState({ current })
  }
  handleFilter = (e) => {
    this.setState({
      filter: e
    })
  }
  getPageSize = () => {
    const right = document.getElementById('shopping-right')
    if (right) {
      const { width, height } = right.getBoundingClientRect()
      return Math.floor(width / 270) * Math.floor((height - 200) / 310)
    } else {
      setTimeout(() => this.forceUpdate(), 1)
      return 1
    }
  }
  render() {
    let { items, chatUsers, toggleSeller } = this.props
    items = items.filter(e => e.name.indexOf(this.state.filter) !== -1)
    const pageSize = this.getPageSize()
    const { current } = this.state
    return (
      <div>
        <ShoppingPageHeader icon="info-circle-o" text="浏览宝贝" />
        <div className={styles.input}>
          <SearchInput placeholder="输入关键词点击搜索"
            handleSubmit={this.handleFilter} />
        </div>
        <QueueAnim type={['bottom', 'right']} delay={500}>
          <div className={styles.flex}>
            {
              items.slice(pageSize * (current - 1), pageSize * current).map(e => (
                <div key={e.id}>
                  <Card className={styles.card}
                    >
                    {
                      e.attachments[0]
                        ? <img onClick={this.handleClick.bind(this, e.id) } src={`/api/photo/show?id=${e.attachments[0].id}`} />
                        : <img onClick={this.handleClick.bind(this, e.id) } src={show} />
                    }
                    <div className={styles.info}>
                      <div onClick={this.handleClick.bind(this, e.id) } className={styles.name}>{ e.name }</div>
                      <span className={styles.sellerName}>
                        {
                          chatUsers[e.seller.id] ?
                            <Tooltip title="点击与卖家聊天">
                              <Icon type="aliwangwang" className={styles.online} onClick={toggleSeller.bind(this, e.seller.id) }/>
                            </Tooltip>
                            :
                            <Tooltip title="卖家未上线">
                              <Icon type="aliwangwang-o" />
                            </Tooltip>
                        }
                        { e.seller.realName }
                      </span>
                      <span className={styles.price}>{ e.price.toFixed(2) }</span>
                    </div>
                  </Card>
                </div>
              ))
            }
          </div>
        </QueueAnim>
        <Pagination className={styles.pagination}
          current={this.state.current}
          total={items.length}
          showTotal={total => `共 ${total} 个商品`}
          pageSize={pageSize}
          onChange={this.handlePagination} />
      </div>
    );
  }
}
export default ShoppingInfoPage;
