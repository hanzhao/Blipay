import React from 'react';
import { connect } from 'react-redux';
import styles from './styles';
import { Button , Card } from 'antd';
import ajax from '../../common/ajax';
import { addItemToCart } from '../../redux/modules/shopping'
@connect(
  (state) => ({}),
  (dispatch) => ({
    onAddItemToCart: (id) => dispatch(addItemToCart(id))
  })
)
class ShoppingInfoTable extends React.Component {
  render() {
    const handleSubmit = async ()=> {
      console.log(this.props.content);
        const res = await ajax.post('/api/order/new',
          {
            sellerId:1,
            buyerId:1,
            count:1,
            cost:this.props.content.price,
            items:[
            {
                itemId:this.props.content.id,
                count:1
            }]
          }
        );
    };
    return (
          <Card className={styles.shoppingInfoCard}>
              <div className={styles.itemImageDiv}>
                <img alt="example" width="100%" src= {this.props.content.thumb} />
              </div>
              <div className={styles.itemName}>{ this.props.content.name }</div>
              <div className={styles.sellerName}>污特污特污</div>
              <div className={styles.price}>{ this.props.content.price }</div>
              <Button className={styles.button} type="primary" size="small"
                onClick={handleSubmit}>生成订单</Button>
          </Card>

    );
  }
}
//this.props.onAddItemToCart.bind(this, this.props.content.id)
export default ShoppingInfoTable;
