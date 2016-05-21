import React from 'react';
import styles from './styles';
import { Form, Button , Card ,Input} from 'antd';
import { reduxForm } from 'redux-form';
import { InputNumber } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
import ajax from '../../common/ajax';
let  currentID=0;
class ShoppingOrderPageTable extends React.Component {
  render() 
  {
    const handleSubmit = ()=> {
      this.props.form.validateFields(async (errors) => {
        let res=await ajax.post('/item/update', 
          {
            id: this.props.content.id,
            name:  this.props.content.name ,
            price: this.props.content.price,
            remain: this.props.content.remain,
            thumb:  this.props.content.thumb,
            description: this.props.content.description,
          } );
        });
    };
    const handleDelete = ()=> {
      this.props.form.validateFields(async (errors) => {
        let res=await ajax.post('/item/delete', 
          {
            id: this.props.content.id
          } );
        });
    };
    const onChangePrice = (value)=> {
        this.props.content.price=value;
    };
    const onChangeRemain = (value)=> {
        this.props.content.remain=value;
    };
    const onChangeDescription = (e)=> {
        this.props.content.description=e.target.value;
        console.log(e.target.value);
    };
    const onChangeName = (e)=> {
        this.props.content.name= e.target.value;
       console.log(e.target.value);
    };
    return (
          <Card className={styles.shoppingInfoCard}>
              <div className={styles.itemImageDiv}>
              <img alt="example" width="100%" src= {this.props.content.thumb} />
              </div>
              <div> 商品名称 </div>
              <Input defaultValue={this.props.content.name} onChange={onChangeName}/>
              <div> 商品价格 </div>
              <InputNumber size="large" min={0}  step={0.01} defaultValue={this.props.content.price} onChange={onChangePrice}/>
              <div> 商品余量 </div>
              <InputNumber size="large" min={0}  step={1} defaultValue={this.props.content.remain} onChange={onChangeRemain}/> 
              <div> 商品描述 </div> 
              <Input type="textarea" defaultValue={this.props.content.description} onChange={onChangeDescription}/>    
              <Button type="primary" onClick= {handleSubmit}>确定修改</Button>
              <Button type="primary" onClick= {handleDelete}>删除商品</Button>
          </Card>
    );
  }
}

ShoppingItenManageTable = createForm()(ShoppingItenManageTable);
export default ShoppingOrderPageTable;