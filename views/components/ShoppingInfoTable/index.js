/*
 * “安全设置”页面中每一个横向部分对应的组件。
 */
import React from 'react';
import styles from './styles';
import { Button , Card } from 'antd';
class ShoppingInfoTable extends React.Component {
  render() {
    return (
          <Card style={{ width: 200 }} bodyStyle={{ padding: 0 }}>
            <div className="itemImage">
              <img alt="example" width="100%" src= {this.props.content.pic} />
            </div>
                <div className="itemName">{ this.props.content.title }</div>
                <div className="sellerName">{ this.props.content.publisher }</div>
                <div className="price">{ this.props.content.price }</div>
                <Button type="primary" size="small">放入购物车</Button>
          </Card>

    );
  }
}

export default ShoppingInfoTable;
