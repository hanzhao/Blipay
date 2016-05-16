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
import { Table } from 'antd';
import { InputNumber } from 'antd';

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

      const columns = [{
          title: '图片',
          dataIndex: 'image',
          key: 'image',
          render: (d) => {
            return <img src={d} className={styles.itemImage}/>;
          }
        }, {
          title: '宝贝名称',
          dataIndex: 'name',
          key: 'name', 
          render: (d) => {
               return <span className={styles.itemName}>{d}</span>;   
          }
         }, {
          title: '单价',
          dataIndex: 'price',
          key: 'price', 
          render: (d) => {
               return <InputNumber size="large" min={0}  step={0.01} defaultValue={Number(d).toFixed(2)} />;   
          }
        }, {
          title: '库存',
          dataIndex: 'remain',
          key: 'remain',
          render: (d) => {
            return <InputNumber size="large" min={0}  step={1} defaultValue={d} />;
          }
        }, {
          title: '商品描述',
          dataIndex: 'description',
          key: 'description',
          render: (d) => {
               return <Input type="textarea" defaultValue={d}/> ;   
          }
        }, {
          title: ' 操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (d) => {
               return(
               <div>
                  <Button type="primary" className={styles.operationButton}>确定修改</Button><br/>
                  <Button type="ghost" className={styles.operationButton}>删除商品</Button> 
                </div>);  
          }
        }];

        const tableProps = {
          pagination: {
            simple: true,
            //pageSize: Math.floor((window.innerHeight - 350) / 50)
            pageSize: Math.floor((window.innerHeight - 350) / 50)
          }
        };

        const contents = Array(3).fill({ 
            image:'https://img.alicdn.com/bao/uploaded/i3/TB1WLCUMXXXXXaBXFXXXXXXXXXX_!!0-item_pic.jpg_430x430q90.jpg',
            name: '高腰牛仔半身裙',
            price: 12450.00,
            remain: 12450,
            description:' bloody hell'
        });

        return (
         <div className={styles.container}>
           <div className={styles.upperHalf}>
                <Cascader className={styles.cascader} placeholder="请选择排序类型" options={optionsPrice} onChange={onChange} />
            </div>
            <div className={styles.lowerHalf}>
                <Table  columns={columns} dataSource={contents}/>
             </div>
        </div>
        );
  }
}

export default ShoppingItemManage;
