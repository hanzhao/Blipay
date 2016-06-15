/** 商品图片跑马灯 */
import React from 'react'
import { Carousel } from 'antd'

import styles from './styles';

class ShoppingPhotosCarousel extends React.Component {
  render() {
    const { photos } = this.props
    if (photos.length === 1) {
      return (
        <div>
          <img className={styles.photo}
               src={`/api/photo/show?id=${photos[0].id}`} />
        </div>
      )
    }
    return (
      <Carousel autoplay>
      { this.props.photos.map(e => (
        <img key={e.id} className={styles.photo}
             src={`/api/photo/show?id=${e.id}`} />
      ))}
      </Carousel>
    )
  }
}

export default ShoppingPhotosCarousel
