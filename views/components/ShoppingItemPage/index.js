/** 商品详情展示页 */
import React from 'react'
import { Alert, Button, Icon, Row, Col, InputNumber, Rate } from 'antd'
import { asyncConnect } from 'redux-connect'
import moment from 'moment'

import ShoppingPageHeader from '../ShoppingPageHeader';
import ShoppingPhotosCarousel from '../ShoppingPhotosCarousel';
import {
  loadItem,
  addCartItem
} from '../../redux/modules/shopping';

import styles from './styles';

/** 渲染商品描述 */
const renderDescription = (text) => (
  <div className={styles.description}>
    { text.split("\n").map((t, i) => (
      <div key={i}>{ t }</div>
    )) }
  </div>
)

class ReviewContent extends React.Component {
  render() {
    const { e } = this.props
    console.log(e)
    return (
      <div className={styles.review}>
        <div className={styles.line}>
          <span className={styles.userName}>
            { e.user.userName }
          </span>
          <Rate disabled defaultValue={e.score} />
          { moment(e.createdAt).format('LLL') }
        </div>
        <div className={styles.detail}>
          评论详情：{ e.text || '太好了！您的宝贝太完美了！' }
        </div>
      </div>
    )
  }
}

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState }, params }) => {
      return dispatch(loadItem(parseInt(params.itemId)))
    }
  }],
  (state) => ({
    item: state.shopping.item,
    user: state.account.user
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
    const { user, item, handleAddCartItem } = this.props
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
                        onClick={handleAddCartItem.bind(this, { ...item, amount: this.amount })}
                        disabled={user && user.id === item.seller.id}>
                  <Icon type="shopping-cart" /> {
                    user && user.id === item.seller.id
                    ? '我的商品' : '放入购物车'
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.feedback}>
          <ShoppingPageHeader icon="book" text="详细描述" />
          <div>
            { renderDescription(item.description) }
          </div>
          <ShoppingPageHeader icon="star" text="买家评价" />
          <div className={styles.reviews}>
          {
            item.reviews.map(e => (
              <ReviewContent key={e.id} e={e} />
            ))
          }
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingItemPage
