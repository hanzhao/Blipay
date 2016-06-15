/** 订票父界面 */
import React from 'react'
import styles from './styles'
import Container from '../Container'
import BookingMenu from '../BookingMenu'

class BookingPage extends React.Component {
  render() {
    return(
      <div className={styles.wrapper}
           style={{ height: window.innerHeight - 85 }}>
        <Container className={styles.container}>
          <div className={styles.left}>
            <BookingMenu />
          </div>
          <div className={styles.right} id="booking-right">
              { this.props.children }
          </div>
        </Container>
      </div>
    )
  }
}

export default BookingPage
