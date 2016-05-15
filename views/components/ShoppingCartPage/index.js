import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Pagination } from 'antd';
import styles from './styles';
import { Table } from 'antd';

function onChangeCheckBox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function onChangeInput(value) {
  console.log('changed', value);
}
class ShoppingCartPage extends React.Component {
  render() {

  const columns = [{
      title: '',
      dataIndex: 'checkbox',
      key: 'checkbox',
      render: () => {
        return <Checkbox defaultChecked={false} onChange={onChangeCheckBox} {...tableProps}/>;
      }
    }, {
      title: '',
      dataIndex: 'image',
      key: 'image',
      render: (d) => {
        return <img src={d} className={styles.itemImage}/>
      }
    }, {
      title: '宝贝',
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
           return <span className={styles.itemPrice}>{Number(d).toFixed(2)}</span>;   
      }
    }, {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
      render: (d) => {
        return <InputNumber min={1} max={1024} defaultValue={3} onChange={onChangeInput} />
      }
    }, {
      title: '金额',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (d) => {
           return <span className={styles.itemTotalCost}>{Number(d).toFixed(2)}</span>;   
      }
    }];

    const contents = Array(10).fill({
        checkbox: 1,
        image: 'http://img10.360buyimg.com/n0/jfs/t1858/73/2105043385/290449/116bd5ed/56ed2ce3N92442c3b.jpg',
        name: '女长袖雪纺衫',
        price: 169,
        amount: 2,
        totalCost: 169*2
    });

    const tableProps = {
      pagination: {
        simple: true,
        //pageSize: Math.floor((window.innerHeight - 350) / 50)
        pageSize: Math.floor((window.innerHeight - 350) / 50)
      }
    };

    return (
    <div className={styles.container}>
    <div className={styles.upperHalf}>

      <Table columns={columns} dataSource={contents} {...tableProps}/>

      <div className={styles.horizontalBar}/>
    </div>

    <div className={styles.lowerHalf}>
        <span className={styles.lowerLeft}><Button className={styles.operationButton} type="ghost">全选 </Button> 
        <Button className={styles.operationButton} type="ghost">删除 </Button></span>
        <span className={styles.lowerRight}><span className={styles.totalCaption}>总价</span><span className={styles.total}>$1245.00</span>
        <Button type="primary" className={styles.payButton}>结算</Button></span>
    </div>
   </div>
    );
  }
}

export default ShoppingCartPage;
