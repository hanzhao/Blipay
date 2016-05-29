import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Cascader } from 'antd';
import { reduxForm } from 'redux-form';
import { Form, Input, Checkbox } from 'antd';
import { Pagination } from 'antd';
import styles from './styles';
import ShoppingItemManageTable from '../ShoppingItemManageTable'
import ShoppingPageHeader from '../ShoppingPageHeader';
import { Card, Col, Row } from 'antd';
import { Table } from 'antd';
import { InputNumber } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import ajax from '../../common/ajax';
const optionsPrice = [{
  value: 'priceLowToHigh',
  label: '价格从小到大'
}, {
    value: 'priceHighToLow',
    label: '价格从大到小'
  }];
function onChange(value) {
  console.log(value);
}
let contents = [];
let BasicDemo = React.createClass
  (
  {
    componentDidMount: async function () {
      const res = await ajax.post('/api/item/item_list', { filter: {} });
      Object.assign(contents, res.items);
      console.log(res);
      this.setState({});
    },
    render() {
      return (
        <div className={styles.container}>
          <ShoppingPageHeader icon="exception" text="商品管理" />
          <div className={styles.lowerHalf}>
          {
            contents.map((e, i) => (
              <ShoppingItemManageTable key={i} content={e} />
            ))
          }
          </div>
        </div>
      );
    }
  })

BasicDemo = createForm()(BasicDemo);
class ShoppingItemManage extends React.Component {
  render() {
    return (
      <BasicDemo />
    );
  }
}

export default ShoppingItemManage;
