import React from 'react'
import { Icon } from 'antd'

import styles from './styles'

const BookingPageHeader = ({ icon, text }) => (
  <h1 className={styles.h1}>
    <Icon type={icon} /> { text }
  </h1>
)

export default BookingPageHeader
