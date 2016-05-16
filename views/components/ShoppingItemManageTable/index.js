import React from 'react';
import styles from './styles';
import { Button , Card ,Input} from 'antd';
import { InputNumber } from 'antd';


class ShoppingItenManageTable extends React.Component {
  render() {
    return (
          <Card className={styles.shoppingInfoCard}>
              <div className={styles.itemImageDiv}>
              <img alt="example" width="100%" src= {this.props.content.pic} />
              </div>
              <div className={styles.itemName}>{ this.props.content.title }</div>
              <div> 商品价格 </div>
              <InputNumber size="large" min={0}  step={0.01} defaultValue={this.props.content.price} />
              <div> 商品余量 </div>
              <InputNumber size="large" min={0}  step={1} defaultValue={this.props.content.remain} /> 
              <div> 商品描述 </div> 
              <Input type="textarea" defaultValue={this.props.content.description}/>    
              <Button type="primary">确定修改</Button>
              <Button type="primary">删除商品</Button>
          </Card>

    );
  }
}

export default ShoppingItenManageTable;