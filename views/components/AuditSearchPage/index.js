import React from 'react';
import styles from './styles.scss';

import {Radio,Row, Col, Input } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const InputGroup = Input.Group;

function onChange(e) {
  console.log(`radio checked:${e.target.value}`);
}

class AuditSearchPage extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
 <div className={styles.searcher}>
    <RadioGroup onChange={onChange} defaultValue="a">
      <RadioButton value="a">订单编号</RadioButton>
      <RadioButton value="b">买家帐号</RadioButton>
      <RadioButton value="c">卖家帐号</RadioButton>
    </RadioGroup>
  </div>
  </div>
    );
  }
}

export default AuditSearchPage;
