import React from 'react';
import { push } from 'react-router-redux';
import { asyncConnect } from 'redux-connect';
import { Card, Icon } from 'antd';
import QueueAnim from 'rc-queue-anim';

import store from '../../redux/store';
import ShoppingPageHeader from '../ShoppingPageHeader';
import {
  loadItems
} from '../../redux/modules/shopping';

import show from './show.jpg';
import styles from './styles';

@asyncConnect(
  [{
    promise: ({ store: { dispatch, getState } }) => {
      return dispatch(loadItems())
    }
  }],
  (state) => ({
    items: state.shopping.items
  })
)
class ShoppingInfoPage extends React.Component {
  handleClick = (id) => {
    store.dispatch(push(`/shopping/item/${id}`))
  }
  render() {
    const { items } = this.props
    return (
      <div>
        <ShoppingPageHeader icon="info-circle-o" text="浏览宝贝" />
        <QueueAnim type={['bottom', 'right']}
                   className={styles.flex} delay={100}>
        {
          items.map(e => (
            <div key={e.id}>
              <Card title={e.name} className={styles.card}
                    onClick={this.handleClick.bind(this, e.id)}>
                {
                  e.attachments[0]
                  ? <img src={`/api/photo/show?id=${e.attachments[0].id}`} />
                  : <img src={show} />
                }
                <div className={styles.info}>
                  <span className={styles.name}>
                    <Icon type="aliwangwang" /> { e.seller.realName }
                  </span>
                  <span className={styles.price}>{ e.price.toFixed(2) }</span>
                </div>
              </Card>
            </div>
          ))
        }
        </QueueAnim>
      </div>
    );
  }
}
export default ShoppingInfoPage;
