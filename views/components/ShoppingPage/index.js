/*
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> master
* gou mai shang pin
*/

import React from 'react';
import styles from './styles';
import Container from '../Container';
import ShoppingMenu from '../ShoppingMenu';
import ShoppingCart from '../ShoppingCart';

class ShoppingPage extends React.Component {
  render() {
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
      </div>
    )
  }
}

export default ShoppingPage;
