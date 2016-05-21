import React from 'react';
import { Menu, Dropdown, Icon,Form} from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Pagination } from 'antd';
import styles from './styles';
import { Table } from 'antd';
import { reduxForm } from 'redux-form';
import ajax from '../../common/ajax';
import { connect } from 'react-redux';
const createForm = Form.create;
const FormItem = Form.Item;
function onChangeInput(e) {
 // console.log(this.target.value);
  //console.log(e);
};
var sum;
function onChangeCheckBox(e,checkedValues) {
  //console.log(checkedValues);
    for(var i=0;i<contents.length;i++)
    {
      if(contents[i].id==e.id)
      {
        contents[i].checked=!contents[i].checked;
        break;
      }
    }
    sum=0;
    for (var i=0;i<contents.length;i++)
    {
      if (contents[i].checked==true)
      {
        sum=sum+contents[i].totalCost;
      }
    }
};
let contents = [];
let itemids=[];
let retitems=[];
let columns = [{
      title: '',
      dataIndex: 'checked',
      key: 'checked',
      render: (d,e) => {
        return <Checkbox defaultChecked={d} onClick={onChangeCheckBox(e)}/>;
      }
    }, {
      title: '',
      dataIndex: 'thumb',
      key: 'thumb',
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
           return <span className={styles.itemPrice}>{d}</span>;   
      }
    }, {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
      render: (d,e,value) => {
        //console.log(e);
        return <InputNumber min={1} max={1024} defaultValue={d} onChange={onChangeInput(e)} />
      }
    }, {
      title: '金额',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (d) => {
           return <span className={styles.itemTotalCost}>{Number(d).toFixed(2)}</span>;   
      }
}];
let pre=0;
let BasicDemo = React.createClass(
{
    getInitialState: async ()=> {
    //console.log(itemids);
    sum=0;
    contents=[];
    for (var i=pre;i<itemids.length;i++)
    {
      var e=itemids[i].e;
      //console.log(itemids);
      let res = await ajax.post('/item/item_list',{id:e ,filter:{},sellerId: 1});
      var has=0;
      //console.log(res.items[0].name);
      for (var j=contents.length-1;j>=0;j--)
      {
        if (contents[j].id == res.items[0].id)
        {
        //  console.log('testamount1',contents[j].amount);
          contents[j].amount=1;
        //  console.log('testamount2',contents[j].amount);
          contents[j].totalCost=contents[j].price*contents[j].amount;
          has=1;
          break;
        }
      }
      if(has==0)
      {
        contents.push({
            checked:false,
            id:res.items[0].id,
            amount:1,
            name:res.items[0].name,
            totalCost:res.items[0].price,
            price:res.items[0].price,
            thumb:res.items[0].thumb,
        });
      }
    }
    return {};
  },
  render() {
    var { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    return(
    <div className={styles.container}>
    <div className={styles.upperHalf}>
      <Table columns={columns} dataSource={contents}/>
      <div className={styles.horizontalBar}/>
    </div>
    <div className={styles.lowerHalf}>
        <span className={styles.lowerLeft}><Button className={styles.operationButton} type="ghost">全选 </Button> 
        <Button className={styles.operationButton} type="ghost">删除 </Button></span>
        <span className={styles.lowerRight}><span className={styles.totalCaption}>总价</span><span className={styles.total}>${sum}</span>
        <Button type="primary" className={styles.payButton}>结算</Button></span>
    </div>
   </div>
    );
  }
});
BasicDemo = createForm()(BasicDemo);
@connect(
  (state) => ({
    items: state.shopping.cartItems
  })
)
class ShoppingCartPage extends React.Component {

    constructor(props) {
      super(props);
      props.items.map((e, i) => 
      (
          itemids=[...itemids,{e}]
      ));
    };
    render() 
    {
      return (
        <BasicDemo />
      );
    }
};

export default ShoppingCartPage;
