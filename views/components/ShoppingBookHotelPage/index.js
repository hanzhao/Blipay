import React from 'react';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import { Card, Icon, Rate, Pagination, Input, Row, Col, Collapse,
  Form, Select, Button, Tooltip, Cascader } from 'antd';
import QueueAnim from 'rc-queue-anim';
import jsonp from 'jsonp';
import querystring from 'querystring';
import classNames from 'classnames';

import { towns } from '../../common/cascaders'
import store from '../../redux/store';
import ShoppingPageHeader from '../ShoppingPageHeader';
import ShoppingBookModal from '../ShoppingBookModal';
import {
  loadRooms,
  toggleSeller,
  toggleBookModal
} from '../../redux/modules/shopping';

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
      return dispatch(loadRooms())
    }
  }],
  (state) => ({
    hotels: state.shopping.hotels,
    chatUsers: state.shopping.chatUsers
  }),
  (dispatch) => ({
    toggleSeller: (userId) => dispatch(toggleSeller(userId)),
    toggleModal: (e) => dispatch(toggleBookModal(e))
  })
)
class ShoppingBookHotelPage extends React.Component {
  state = {
    current: 1,
    filter: ''
  }
  handlePagination = (current) => {
    this.setState({ current })
  }
  handleFilter = (e) => {
    this.setState({
      filter: e
    })
  }
  render() {
    let { hotels, chatUsers, toggleSeller } = this.props
    const { current } = this.state
    return (
      <div className={styles.wrapper}>
        <ShoppingPageHeader icon="home" text="酒店列表" />
        <Row className={styles.input}>
          <Col span="6" offset="5">
            <span>城市：</span>
            <Cascader options={towns.provs} placeholder="选择酒店所在城市" />
          </Col>
          <Col span="6" offset="2">
            <SearchInput placeholder="输入酒店名点击搜索"
              handleSubmit={this.handleFilter} />
          </Col>
        </Row>
        <div className={styles.container}>
          <Collapse defaultActiveKey={[hotels[0] && hotels[0].id.toString()]}>
            {
              hotels.slice(10 * (current - 1), 10 * current).map(e => (
                <Collapse.Panel accordion key={e.id} header={
                  <div>
                    <span className={styles.wangwang}>
                    {
                      chatUsers[e.id] ? <Tooltip title="点击与卖家聊天">
                        <Icon type="aliwangwang" className={styles.online} onClick={toggleSeller.bind(this, e.id) }/>
                      </Tooltip> : <Tooltip title="卖家未上线">
                        <Icon type="aliwangwang-o" />
                      </Tooltip>
                    }
                    </span>
                    <span className={styles.name}>
                      { e.realName }
                    </span>
                    <Rate disabled defaultValue={e.id % 2 ? 5 : 4.5} allowHalf style={{ float: 'right' }} />
                    <span className={styles.address}>
                      地址：{ e.address || '暂无地址信息' }
                    </span>
                  </div>
                }>
                {
                  e.rooms.map(r => (
                    !r.disabled && <Row className={styles.line} key={r.id}>
                      <Col span="12" className={styles.name}>
                        { r.name }
                        <span className={styles.address}>{ r.description }</span>
                      </Col>
                      <Col span="5" className={styles.price}>{ r.price }</Col>
                      <Col span="5">
                        <Button type="primary" onClick={this.props.toggleModal.bind(this, { user: e, room: r })}>
                          预订房间
                        </Button>
                      </Col>
                    </Row>
                  ))
                }
                </Collapse.Panel>
              ))
            }
          </Collapse>
        </div>
        <Pagination className={styles.pagination}
          current={this.state.current}
          total={hotels.length}
          showTotal={total => `共 ${total} 个酒店`}
          pageSize={10}
          onChange={this.handlePagination} />
        <ShoppingBookModal />
      </div>
    );
  }
}
export default ShoppingBookHotelPage;
