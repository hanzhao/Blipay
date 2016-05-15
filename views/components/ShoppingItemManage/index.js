import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Cascader } from 'antd';
import { reduxForm } from 'redux-form';
import { Form, Input, Checkbox } from 'antd';
import { Pagination } from 'antd';
import styles from './styles';
import ShoppingItemManageTable from '../ShoppingItemManageTable'
import { Card, Col, Row } from 'antd';
const optionsPrice = [{
  value: 'priceLowToHigh',
  label: '价格从小到大'
},{
  value: 'priceHighToLow',
  label: '价格从大到小'
}];
function onChange(value) {
  console.log('changed', value);
}
class ShoppingItemManage extends React.Component {
  render() {
        const contents = Array(3).fill({ 
            pic:'https://img.alicdn.com/bao/uploaded/i3/TB1WLCUMXXXXXaBXFXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg',
            title: '高腰牛仔半身裙',
            price: '12450.00',
            remain:'12450',
            description:'bloody hell'
        });
        return (
         <div className={styles.container}>
         <div className={styles.upperHalf}>
            <nobr>
              <Cascader className={styles.cascader} placeholder="请选择排序类型" options={optionsPrice} onChange={onChange} />
            </nobr>
          </div>
          <div className={styles.lowerHalf}>
            <Row type="flex" justify="start" align="left">
              {
                contents.map((e,i) => (
                  <Col span={24}>
                  <ShoppingItemManageTable className={styles.row} key={i} content={e} />
                  </Col>
                ))
              }   
            </Row>
            <Pagination simple defaultCurrent={2} total={12450} />
          </div>
        </div>
        );
  }
}

export default ShoppingItemManage;