/*
* gou mai shang pin
*/

import React from 'react';
import styles from './styles';
import Container from '../Container';
import ShoppingMenu from '../ShoppingMenu';
import ShoppingCart from '../ShoppingCart';
import ShoppingLoggingModal from '../ShoppingLoggingModal'
import { connect } from 'react-redux';
import {
  startChat
} from '../../redux/modules/shopping';


@connect(
  (state) => ({
    user: state.account.user,
  }),
  (dispatch) => ({
    startChat: () => dispatch(startChat())
  })
)
class ShoppingPage extends React.Component {

  render() {
    console.log(this.props.userId)
    if(this.props.user)
      startChat()
    return(
      <div className={styles.wrapper}
           style={{ height: window.innerHeight - 85 }}>
        <Container className={styles.container}>
          <div className={styles.left}>
            <ShoppingMenu />
          </div>
          <div className={styles.right} id="shopping-right">
              { this.props.children }
          </div>
        </Container>
        <ShoppingCart />
        <ShoppingLoggingModal />
      </div>
    )
  }
}

export default ShoppingPage;
