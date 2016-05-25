import React from 'react'
import { Alert, Button, Icon, Row, Col, InputNumber } from 'antd'
import { asyncConnect } from 'redux-connect'

import ShoppingPageHeader from '../ShoppingPageHeader';
import ShoppingPhotosCarousel from '../ShoppingPhotosCarousel';
import {
  loadItem,
  addCartItem
} from '../../redux/modules/shopping';

import styles from './styles';

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState }, params }) => {
      return dispatch(loadItem(parseInt(params.itemId)))
    }
  }],
  (state) => ({
    item: state.shopping.item
  }),
  (dispatch) => ({
    handleAddCartItem: (item) => dispatch(addCartItem({ ...item, amount: item.amount.now }))
  })
)
class ShoppingItemPage extends React.Component {
  amount = {
    now: 1
  };
  saveAmount = (amount) => {
    this.amount.now = amount
  }
  render() {
    const { item, handleAddCartItem } = this.props
    return (
      <div>
        <ShoppingPageHeader icon="smile" text="浏览商品" />
        <div className={styles.container}>
          <div className={styles.infoContainer}>
            <div className={styles.carousel}>
              <ShoppingPhotosCarousel photos={item.attachments} />
            </div>
            <div className={styles.info}>
              <div className={styles.title}>{ item.name }</div>
              <Row className={styles.user}>
                <Col span="9" offset="3">
                  <Icon type="user" /> 出售店家：
                </Col>
                <Col span="12">
                  { item.seller.realName }
                </Col>
              </Row>
              <Row className={styles.price}>
                <Col span="9" offset="3">
                  <Icon type="pay-circle-o" /> 价格：
                </Col>
                <Col span="12">
                  <span className={styles.priceNumber}>
                    { item.price.toFixed(2) }
                  </span>
                </Col>
              </Row>
              <Row className={styles.remain}>
                <Col span="9" offset="3">
                  <Icon type="home" /> 剩余：
                </Col>
                <Col span="12">
                  <span className={styles.remainNumber}>{ item.remain }</span> 件
                </Col>
              </Row>
              <Row className={styles.buy}>
                <Col span="9" offset="3">
                  <Icon type="book" /> 购买数量：
                </Col>
                <Col span="12">
                  <InputNumber min={1}
                               max={item.remain}
                               defaultValue={1}
                               onChange={this.saveAmount} />
                </Col>
              </Row>
              <div className={styles.buttonContainer}>
                <Button size="large" type="primary"
                        onClick={handleAddCartItem.bind(this, { ...item, amount: this.amount })}>
                  <Icon type="shopping-cart" /> 放入购物车
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <ShoppingPageHeader icon="book" text="详细描述" />
          <ShoppingPageHeader icon="star" text="买家评价" />
        </div>
      </div>
    )
  }
}

export default ShoppingItemPage
