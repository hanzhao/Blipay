/** 订单主页面 */
import React from 'react';
import { Button } from 'antd';
import styles from './styles';
import { Menu, Dropdown, Icon } from 'antd';
import { Cascader } from 'antd';
import ShoppingMenu from '../ShoppingMenu';

function onChange(value) {
  console.log(value);
}
class ShoppingWelcomePage extends React.Component {
  render() {
    return (
    	<div className={styles.container}>
        <div className={styles.left}>
          <ShoppingMenu />
        </div>
    	</div>

    );
  }

}

export default ShoppingWelcomePage;
