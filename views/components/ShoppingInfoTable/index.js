import React from 'react';
import styles from './styles';
import { Button , Card } from 'antd';

class ShoppingInfoTable extends React.Component {
  render() {
    return (
          <Card className={styles.shoppingInfoCard}>
              <div className={styles.itemImageDiv}>
                <img alt="example" width="100%" src= {this.props.content.pic} />
              </div>
              <div className={styles.itemName}>{ this.props.content.title }</div>
              <div className={styles.sellerName}>{ this.props.content.publisher }</div>
              <div className={styles.price}>{ this.props.content.price }</div>
              <Button className={styles.button} type="primary" size="small">放入购物车</Button>
              
          </Card>

    );
  }
}

export default ShoppingInfoTable;
