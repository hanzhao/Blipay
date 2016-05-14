import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { InputNumber } from 'antd';
import { Pagination } from 'antd';
import pic from './akarin.png'
import styles from './styles';

function onChangeCheckBox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function onChangeInput(value) {
  console.log('changed', value);
}
class ShoppingCartPage extends React.Component {
  render() {
    return (
    <div className={styles.container}>
    <div className={styles.upperHalf}>
      <div className={styles.itemRecord}>
          <table border="0">
          <tr>
          <td className={styles.checkboxCol}>
          <Checkbox defaultChecked={false} onChange={onChangeCheckBox} />
          </td>
          <td className={styles.imgCol}>
          <img src={pic} className={styles.img} />
          </td>
          <td className={styles.itemNameCol}>
          akarin
          </td>
          <td className={styles.amountCol}>
          <InputNumber min={1} max={1024} defaultValue={3} onChange={onChangeInput} />
          </td>
          <td className={styles.priceCol}>
          124.5$
          </td>
          </tr>
          </table>
      </div>

      <div className={styles.horizontalBar}/>
      <br/>

      <div className={styles.itemRecord}>
          <table border="0">
          <tr>
          <td className={styles.checkboxCol}>
          <Checkbox defaultChecked={false} onChange={onChangeCheckBox} />
          </td>
          <td className={styles.imgCol}>
          <img src={pic} className={styles.img} />
          </td>
          <td className={styles.itemNameCol}>
          akarin
          </td>
          <td className={styles.amountCol}>
          <InputNumber min={1} max={1024} defaultValue={3} onChange={onChangeInput} />
          </td>
          <td className={styles.priceCol}>
          124.5$
          </td>
          </tr>
          </table>
      </div>    

      <div className={styles.horizontalBar}/>
      <br/>

      <div className={styles.itemRecord}>
          <table border="0">
          <tr>
          <td className={styles.checkboxCol}>
          <Checkbox defaultChecked={false} onChange={onChangeCheckBox} />
          </td>
          <td className={styles.imgCol}>
          <img src={pic} className={styles.img} />
          </td>
          <td className={styles.itemNameCol}>
          akarin
          </td>
          <td className={styles.amountCol}>
          <InputNumber min={1} max={1024} defaultValue={3} onChange={onChangeInput} />
          </td>
          <td className={styles.priceCol}>
          124.5$
          </td>
          </tr>
          </table>
      </div>    


      <div className={styles.horizontalBar}/>
      <br/><br/>
    </div>
 
  
    
    <div className={styles.lowerHalf}>
      <table border="0">
        <tr>
        <td className={styles.operationCol}>
        <Button className={styles.operationButton} type="ghost">全选 </Button> 
        <Button className={styles.operationButton} type="ghost">删除 </Button>
        </td>
        <td className={styles.placeHolder}></td>
        <td className={styles.totalCaption}><div >总价</div> </td><td className={styles.total}><div>$1245.00</div></td>
        </tr>
        <td/><td/><td/><td ><Button type="primary" size="large" className={styles.payButton}>结算</Button></td>
        </table>
        <Pagination defaultCurrent={1} total={500} />
    </div>
   </div>
    );
  }
}

export default ShoppingCartPage;