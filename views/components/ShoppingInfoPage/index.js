import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Cascader } from 'antd';
import { reduxForm } from 'redux-form';
import { Form, Input, Checkbox } from 'antd';
import { Pagination } from 'antd';
import styles from './styles';
import pic from './gg.png'
import ShoppingInfoTable from '../ShoppingInfoTable'
import ajax from '../../common/ajax';
import { Card, Col, Row } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
const optionsPrice = [{
  value: 'priceLowToHigh',
  label: '价格从小到大'
}, {
    value: 'priceHighToLow',
    label: '价格从大到小'
  }];

const optionsCategory = [{
  value: 'isElectronic',
  label: '电子产品'
}, {
    value: 'isDaily',
    label: '日用'
  }, {
    value: 'isFood',
    label: '食品'
  }, {
    value: 'isCloth',
    label: '服饰'
  }];

function onChange(value) {
  console.log(value);
};
let contents = [];
let pagesum = 1;
let tempage = 1;
let BasicDemo = React.createClass(
  {
    componentDidMount: async function () {
      const res = await ajax.post('/api/item/item_list', { filter: {}, sellerId: 1 });
      console.log(require('util').inspect(res));
      Object.assign(contents, res.items);
      this.setState({});
    },
    handleSearch(e) {
      e.preventDefault();
      this.props.form.validateFields(async (errors) => {
        let res = await ajax.post('/api/item/item_list',
          {
            "id": 0,    // Only in single item query (stay null if not)
            "base": "price",    // time | remain | price
            "order": "ASC", // "ASC"
            "head": 0,
            "length": 6,
          });
        Object.assign(contents, res);
      });
    },
    render() {
      return (
        <div className={styles.container}>
          <div className={styles.upperHalf}>
            <nobr>
              <Cascader className={styles.cascader} placeholder="请选择排序类型" options={optionsPrice} onChange={onChange} />
              <Cascader className={styles.cascader} placeholder="请选择商品类别" options={optionsCategory} onChange={onChange} />
              <Button type="ghost" className={styles.button} onClick={this.handleSearch}>搜索</Button>
            </nobr>
          </div>
          <div className={styles.lowerHalf}>
            <Row type="flex" justify="start" align="left">
              {
                contents.map((e, i) => (
                  <Col span={8}>
                    <ShoppingInfoTable className={styles.row} key={i} content={e} />
                  </Col>
                ))
              }
            </Row>
            <Pagination simple defaultCurrent={tempage} total={pagesum} />
          </div>
        </div>
      );
    }
  });

BasicDemo = createForm()(BasicDemo);
import { connect } from 'react-redux';
@connect(
  (state) => ({
    items: state.shopping.cartItems
  })
)
class ShoppingInfoPage extends React.Component {
  render() {
    return (
      <div>
        <BasicDemo />
        { this.props.items.map((e, i) => (
          <div key={i}>CartItem ID: {e}</div>
        )) }
      </div>
    );
  }
}
export default ShoppingInfoPage;
